import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Checkbox,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { Transformer } from "../../Types";
import { format } from "date-fns";
import { RootState, setSelectedTransformerIds } from "../../store";

interface VoltageChartProps {
  transformers: Transformer[];
}

const COLORS = [
  "#2563EB",
  "#DC2626",
  "#059669",
  "#D97706",
  "#7C3AED",
  "#DB2777",
];

export function VoltageChart({ transformers }: VoltageChartProps) {
  const dispatch = useDispatch();
  const { searchQuery, regionFilter, healthFilter, selectedTransformerIds } =
    useSelector((state: RootState) => state.filters);

  // Filter transformers based on the same criteria used in the table
  const filteredTransformers = transformers.filter((transformer) => {
    // Text search filter
    const matchesSearch =
      transformer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.health.toLowerCase().includes(searchQuery.toLowerCase());
    // Region filter
    const matchesRegion =
      regionFilter === "all" || transformer.region === regionFilter;
    // Health filter
    const matchesHealth =
      healthFilter === "all" || transformer.health === healthFilter;
    return matchesSearch && matchesRegion && matchesHealth;
  });

  // Check if no filters are applied
  const noFiltersApplied =
    !searchQuery && regionFilter === "all" && healthFilter === "all";

  // Initialize selection on component mount or when all filters are cleared
  useEffect(() => {
    // If no filters are applied, select all transformers
    if (noFiltersApplied) {
      const allTransformerIds = transformers.map((t) => t.assetId);

      // Only dispatch if the selection is different
      if (
        selectedTransformerIds.length !== allTransformerIds.length ||
        !selectedTransformerIds.every((id) => allTransformerIds.includes(id))
      ) {
        dispatch(setSelectedTransformerIds(allTransformerIds));
      }
    }
    // If there are filters but no selections, select all filtered transformers
    else if (
      selectedTransformerIds.length === 0 &&
      filteredTransformers.length > 0
    ) {
      dispatch(
        setSelectedTransformerIds(filteredTransformers.map((t) => t.assetId))
      );
    }
  }, [noFiltersApplied, filteredTransformers.length]);

  // Keep selection in sync with filters, but preserve manual selections
  useEffect(() => {
    if (!noFiltersApplied && filteredTransformers.length > 0) {
      // Get all available transformer IDs after filtering
      const availableIds = new Set(filteredTransformers.map((t) => t.assetId));

      // Only update if the current selection includes transformers that are no longer available
      const currentSelection = [...selectedTransformerIds].filter((id) =>
        transformers.some((t) => t.assetId === id)
      );

      // Find which selected transformers are still valid with current filters
      const validSelection = currentSelection.filter((id) =>
        availableIds.has(id)
      );

      // If the selection is empty after filtering, select all available ones
      if (validSelection.length === 0) {
        dispatch(setSelectedTransformerIds([...availableIds]));
      } else if (validSelection.length !== currentSelection.length) {
        // Otherwise update to remove transformers that are no longer available
        dispatch(setSelectedTransformerIds(validSelection));
      }
    }
  }, [searchQuery, regionFilter, healthFilter]);

  const toggleTransformer = (assetId: number) => {
    const newSelection = selectedTransformerIds.includes(assetId)
      ? selectedTransformerIds.filter((id) => id !== assetId)
      : [...selectedTransformerIds, assetId];

    // Don't allow deselecting the last transformer
    // if (newSelection.length === 0) {
    //   return;
    // }

    dispatch(setSelectedTransformerIds(newSelection));
  };

  // Prepare data for the chart - use all transformers when no filters, otherwise filtered ones
  const transformersToShow = noFiltersApplied
    ? transformers
    : filteredTransformers;

  const chartData =
    transformersToShow.length > 0
      ? transformersToShow[0].lastTenVoltgageReadings
          .map((_, index) => {
            const dataPoint: any = {
              date: format(
                new Date(
                  transformersToShow[0].lastTenVoltgageReadings[index].timestamp
                ),
                "MMM dd"
              ),
            };
            transformersToShow.forEach((transformer) => {
              dataPoint[transformer.name] = parseInt(
                transformer.lastTenVoltgageReadings[index].voltage
              );
            });
            return dataPoint;
          })
          .reverse()
      : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transformer Voltage Readings</CardTitle>
        <CardDescription>
          {transformersToShow.length > 0
            ? `Voltage trends over the last 10 days (${
                selectedTransformerIds.filter((id) =>
                  transformersToShow.some((t) => t.assetId === id)
                ).length
              } of ${transformersToShow.length} transformers selected)`
            : "No transformers match the current filters"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transformersToShow.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Select Transformers:</div>
              <div className="flex flex-wrap gap-4">
                {transformersToShow.map((transformer, index) => (
                  <div
                    key={transformer.assetId}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`transformer-${transformer.assetId}`}
                      checked={selectedTransformerIds.includes(
                        transformer.assetId
                      )}
                      onCheckedChange={() =>
                        toggleTransformer(transformer.assetId)
                      }
                      className="border-2"
                      style={{ borderColor: COLORS[index % COLORS.length] }}
                    />
                    <label
                      htmlFor={`transformer-${transformer.assetId}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      style={{ color: COLORS[index % COLORS.length] }}
                    >
                      {transformer.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {chartData.length > 0 ? (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={[15000, 45000]}
                    label={{
                      value: "Voltage",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  {transformersToShow.map(
                    (transformer, index) =>
                      selectedTransformerIds.includes(transformer.assetId) && (
                        <Line
                          key={transformer.assetId}
                          type="monotone"
                          dataKey={transformer.name}
                          stroke={COLORS[index % COLORS.length]}
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      )
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">
                No data available for the current filter selection
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
