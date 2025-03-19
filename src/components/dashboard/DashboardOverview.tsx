
import RecentActivity from "./RecentActivity";
import UpcomingTasks from "./UpcomingTasks";

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <RecentActivity />
      </div>
      <div>
        <UpcomingTasks />
      </div>
    </div>
  );
};

export default DashboardOverview;
