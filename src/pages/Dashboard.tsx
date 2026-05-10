import { BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BookTable } from "@/components/books/BookTable";


const stats = [
  {
    label: "Total Books",
    value: "143",
    icon: BookOpen,
    color: "bg-blue-500/80",
  },
  {
    label: "Active Users",
    value: "18",
    icon: Users,
    color: "bg-green-500/80",
  },
  { label: "Due Returns", value: "12", icon: Clock, color: "bg-yellow-500/80" },
  { label: "Overdue", value: "8", icon: AlertCircle, color: "bg-red-500/80" },
];


export const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="p-8 max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-poiret text-left w-full font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        <BookTable/>
      </div>
    </div>
  );
};
