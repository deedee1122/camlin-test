import { TransformerTable, VoltageChart } from "../components/Display";
import { transformersData } from "../data/transformers";

export const Home = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Transformer Monitoring Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Transformers</h2>
          <TransformerTable transformers={transformersData} />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Voltage Analysis</h2>
          <VoltageChart transformers={transformersData} />
        </div>
      </div>
    </div>
  );
};
