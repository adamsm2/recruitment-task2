import { apiClient } from "./client.ts";

async function getTasks(nameFilter: string) {
  const response = await apiClient
    .get("/tasks", {
      params: {
        name: nameFilter,
      },
    });
  return response.data.data;
}

async function createTask(name: string) {
  await apiClient
    .post("/tasks", { name });
}

async function bookmarkTask(taskId: number) {
  await apiClient
    .post(`/tasks/${taskId}/bookmark`).then((response) => {
      if (response.status === 404) {
        throw new Error("Task not found");
      }
    });
}

async function unbookmarkTask(taskId: number) {
  await apiClient
    .post(`/tasks/${taskId}/unbookmark`).then((response) => {
      if (response.status === 404) {
        throw new Error("Task not found");
      }
    });
}

export default { getTasks, createTask, bookmarkTask, unbookmarkTask };