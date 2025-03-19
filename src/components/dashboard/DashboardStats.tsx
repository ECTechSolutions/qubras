
import { Users, MessageSquare, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Matches",
      value: "24",
      description: "+4 new this week",
      icon: <Users className="h-4 w-4 text-qubras-600" />
    },
    {
      title: "Messages",
      value: "12",
      description: "5 unread messages",
      icon: <MessageSquare className="h-4 w-4 text-qubras-600" />
    },
    {
      title: "ROI",
      value: "32%",
      description: "+8% from last month",
      icon: <TrendingUp className="h-4 w-4 text-qubras-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          index={index}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
