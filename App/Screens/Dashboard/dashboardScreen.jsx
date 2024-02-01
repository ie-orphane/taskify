import { ProjectsComponent } from "./components/projects";
import { TasksComponent } from "./components/tasks";

export const DashboardScreen = () => {
  return (
    <>
      <ProjectsComponent />
      <TasksComponent />
    </>
  );
};
