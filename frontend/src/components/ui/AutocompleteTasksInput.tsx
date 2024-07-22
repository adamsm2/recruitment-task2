import { CircularProgress } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import TaskApi from "../../api/task.ts";
import { toast } from "react-toastify";
import TaskItem from "./TaskItem.tsx";
import { Task } from "../../types/task.ts";

const AutocompleteTasksInput = () => {
  const queryClient = useQueryClient();
  const initialized = useRef(false);
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 200);

  const { data: tasks, status } = useQuery({
    queryKey: ["tasks", debouncedSearch],
    queryFn: () => {
      if (!initialized.current) {
        initialized.current = true;
        return "";
      }
      console.log("fetching");
      return TaskApi.getTasks(search);
    },
  });

  const createTask = useMutation({
    mutationFn: TaskApi.createTask,
    onSuccess: () => {
      toast.success("A new task successfully created");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Invalid task name");
    },
  });

  const handleCreateTask = async () => {
    setCreateTaskLoading(true);
    await createTask.mutateAsync(search);
    setCreateTaskLoading(false);
  };

  const bookmarkTask = useMutation({
    mutationFn: TaskApi.bookmarkTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Task not found.");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const unbookmarkTask = useMutation({
    mutationFn: TaskApi.unbookmarkTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Task not found");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { bookmarkedTasks, notBookmarkedTasks } = tasks ? tasks.reduce((acc, task: Task) => {
    if (task.bookmarked) {
      acc.bookmarkedTasks.push(task);
    } else {
      acc.notBookmarkedTasks.push(task);
    }
    return acc;
  }, { bookmarkedTasks: [], notBookmarkedTasks: [] }) : { bookmarkedTasks: [], notBookmarkedTasks: [] };

  return (
    <div className="bg-transparent w-40 sm:w-96">
      <div className="bg-aquaGreen-50 rounded-lg p-0.5 ">
        <div className="flex flex-row rounded-lg bg-white border border-gray-300 focus-within:border-aquaGreen-100">
          <input onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Search for a task"
                 className="text-sm sm:text-base text-gray-500 font-semibold rounded-lg focus:outline-none block w-full p-0.5 sm:p-2.5" />
          {status === "pending" ?
            <CircularProgress size={16} sx={{ marginRight: 2, marginY: "auto" }} /> : null}
          <SearchIcon />
        </div>
      </div>
      {search === "" || status === "pending" || !tasks ? null :
        <div className="bg-white rounded-lg mt-0.5 pt-0.5 pb-2 max-h-48 overflow-y-scroll custom-scrollbar">
          <h1 className="py-1 px-3 text-xs font-medium text-gray-500">Bookmarked tasks</h1>
          <div className="flex flex-col">
            {bookmarkedTasks.map((task: Task) => {
              return (
                <TaskItem key={task.id} name={task.name} bookmarked={task.bookmarked}
                          handleBookmark={() => unbookmarkTask.mutate(task.id)} />
              );
            })}
          </div>
          <h1 className="py-1 px-3 text-xs font-medium text-gray-500">Tasks</h1>
          <div className="flex flex-col">
            {notBookmarkedTasks.map((task: Task) => {
              return (
                <TaskItem key={task.id} name={task.name} bookmarked={task.bookmarked}
                          handleBookmark={() => bookmarkTask.mutate(task.id)} />
              );
            })}
          </div>
          <h1 className="py-1 px-3 text-xs font-medium text-gray-500">Create a new task</h1>
          {createTaskLoading ?
            <div className="flex flex-col items-center"><CircularProgress size={24} sx={{}} /></div> :
            <div onClick={handleCreateTask}
                 className="py-1 px-5 flex flex-row items-center group hover:bg-aquaGreen-50">
              <h1
                className="cursor-default text-gray-500 font-semibold group-hover:text-aquaGreen-100 break-words overflow-hidden">Create
                new
                task -
                "{search}"</h1>
            </div>
          }
        </div>
      }
    </div>
  );
};

const SearchIcon = () => {
  return (
    <MagnifyingGlassIcon className="size-4 my-auto mr-2 text-gray-400" />
  );
};

export default AutocompleteTasksInput;