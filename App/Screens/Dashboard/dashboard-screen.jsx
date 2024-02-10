import { CollectionsComponent } from "./components/collections-component";
import { TasksComponent } from "./components/tasks-component";
import { UserComponent } from "./components/user-component";

export const DashboardScreen = () => {
  return (
    <>
      <UserComponent />
      <CollectionsComponent />
      <TasksComponent />
    </>
  );
};
