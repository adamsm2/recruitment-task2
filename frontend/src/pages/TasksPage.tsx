import AutocompleteTasksInput from "../components/ui/AutocompleteTasksInput.tsx";

const TasksPage = () => {
  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="mb-4 text-lg sm:text-2xl font-semibold text-gray-900">Tasks page</h1>
      <AutocompleteTasksInput />
    </div>
  );
};


export default TasksPage;