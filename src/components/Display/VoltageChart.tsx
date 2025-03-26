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
  const selectedTransformerIds = useSelector(
    (state: RootState) => state.filters.selectedTransformerIds
  );

  const toggleTransformer = (assetId: number) => {
    const newSelection = selectedTransformerIds.includes(assetId)
      ? selectedTransformerIds.filter((id) => id !== assetId)
      : [...selectedTransformerIds, assetId];

    dispatch(setSelectedTransformerIds(newSelection));
  };

  // Prepare data for the chart
  const chartData =
    transformers[0]?.lastTenVoltgageReadings
      .map((_, index) => {
        const dataPoint: any = {
          date: format(
            new Date(transformers[0].lastTenVoltgageReadings[index].timestamp),
            "MMM dd"
          ),
        };
        transformers.forEach((transformer) => {
          dataPoint[transformer.name] = parseInt(
            transformer.lastTenVoltgageReadings[index].voltage
          );
        });
        return dataPoint;
      })
      .reverse() || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transformer Voltage Readings</CardTitle>
        <CardDescription>Voltage trends over the last 10 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-medium">Select Transformers:</div>
            <div className="flex flex-wrap gap-4">
              {transformers.map((transformer, index) => (
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
                    className={`border-2 border-${
                      COLORS[index % COLORS.length]
                    }`}
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
                {transformers.map(
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
        </div>
      </CardContent>
    </Card>
  );
}
