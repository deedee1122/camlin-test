import { useState } from "react";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { Transformer } from "../../Types";

interface TransformerTableProps {
  transformers: Transformer[];
}

export function TransformerTable({ transformers }: TransformerTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransformers = transformers.filter(
    (transformer) =>
      transformer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.health.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="Search transformers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
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
            {filteredTransformers.map((transformer) => (
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
            ))}
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
