import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Badge,
} from "../ui";
import { Transformer } from "../../Types";
import { X } from "lucide-react";
import {
  setSearchQuery,
  setRegionFilter,
  setHealthFilter,
  clearAllFilters,
  RootState,
} from "../../store";

interface TransformerTableProps {
  transformers: Transformer[];
}

export function TransformerTable({ transformers }: TransformerTableProps) {
  const dispatch = useDispatch();
  const { searchQuery, regionFilter, healthFilter } = useSelector(
    (state: RootState) => state.filters
  );

  // Get unique regions and health statuses for filters
  const regions = Array.from(new Set(transformers.map((t) => t.region)));
  const healthStatuses = Array.from(new Set(transformers.map((t) => t.health)));

  // Apply filters
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

  // Clear all filters
  const clearFilters = () => {
    dispatch(clearAllFilters());
  };

  // Check if any filter is active
  const isFilterActive =
    searchQuery || regionFilter !== "all" || healthFilter !== "all";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search transformers..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Select
            value={regionFilter}
            onValueChange={(value) => dispatch(setRegionFilter(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select
            value={healthFilter}
            onValueChange={(value) => dispatch(setHealthFilter(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Health Statuses</SelectItem>
                {healthStatuses.map((health) => (
                  <SelectItem key={health} value={health}>
                    {health}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {isFilterActive && (
          <Button
            variant="outline"
            size="icon"
            onClick={clearFilters}
            className="shrink-0"
            title="Clear filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {isFilterActive && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge
              variant="outline"
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => dispatch(setSearchQuery(""))}
            >
              Search: {searchQuery}
              <X className="h-3 w-3" />
            </Badge>
          )}

          {regionFilter !== "all" && (
            <Badge
              variant="outline"
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => dispatch(setRegionFilter("all"))}
            >
              Region: {regionFilter}
              <X className="h-3 w-3" />
            </Badge>
          )}

          {healthFilter !== "all" && (
            <Badge
              variant="outline"
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => dispatch(setHealthFilter("all"))}
            >
              Health: {healthFilter}
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTransformers.length} of {transformers.length}{" "}
        transformers
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransformers.length > 0 ? (
              filteredTransformers.map((transformer) => (
                <TableRow key={transformer.assetId}>
                  <TableCell className="font-medium">
                    {transformer.name}
                  </TableCell>
                  <TableCell>{transformer.region}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${getHealthColor(transformer.health)}`}
                    >
                      {transformer.health}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-4 text-muted-foreground"
                >
                  No transformers found matching the filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function getHealthColor(health: string): string {
  switch (health) {
    case "Excellent":
      return "bg-green-100 text-green-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Fair":
      return "bg-yellow-100 text-yellow-800";
    case "Poor":
      return "bg-orange-100 text-orange-800";
    case "Critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
