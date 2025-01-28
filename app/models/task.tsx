/* eslint-disable import/no-unresolved */
import { mockTasks } from "~/constants/mock";
import { Task } from "~/constants/types";

export const getTaskById = async (taskId: string) => {
  const task: Task | undefined = mockTasks.find((task) => task.id === taskId);
  return task;
};

export const getAllTasks = async (search?: string) => {
  const params = new URLSearchParams(search);
  const page = params.get("page") ? Number.parseInt(params.get("page")!) : 1;
  const paginatedResult = paginatedTasks(mockTasks, page, 5);
  return { tasks: paginatedResult, total: mockTasks.length };
};

export const getAllTasksFiltered = async (search?: string) => {
  const { tasks, total } = await filterAndSortTasks(mockTasks, search);
  return { tasks, total };
};

export const updateTask = async (task: Task) => {
  const index = mockTasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    mockTasks[index] = { ...mockTasks[index], ...task };
  }
  return mockTasks[index];
};

export const deleteTask = async (taskId: string) => {
  const index = mockTasks.findIndex((task) => task.id === taskId);
  if (index == -1) return false;
  mockTasks.splice(index, 1);
  return true;
};

export const createTask = async (task: Task) => {
  const newTask: Task = task;
  mockTasks.push(newTask);
  return newTask;
};

export const createMultipleTasks = async (tasks: Task[]) => {
  const newTasks: Task[] = tasks;
  mockTasks.push(...newTasks);
  return newTasks;
};

export const filterTasksByStatus = async (status: string) => {
  const tasks: Task[] = mockTasks.filter((task) => task.status === status);
  return tasks;
};

export const filterTasksByLatestUpdate = async () => {
  const tasks: Task[] = mockTasks.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return tasks;
};

export const getTasksByFolderId = async (folderId: string, search?: string) => {
  const tasksData: Task[] = mockTasks.filter(
    (task) => task.folderId === folderId
  );
  const params = new URLSearchParams(search);
  const page = params.get("page") ? Number.parseInt(params.get("page")!) : 1;
  const paginatedResult = paginatedTasks(tasksData, page, 5);
  return { tasks: paginatedResult, total: tasksData.length };
};

export const getTasksFilteredByFolderId = async (
  folderId: string,
  search?: string
) => {
  const tasksData: Task[] = mockTasks.filter(
    (task) => task.folderId === folderId
  );
  const { tasks, total } = await filterAndSortTasks(tasksData, search);
  return { tasks, total };
};

export const filterAndSortTasks = async (tasks: Task[], search?: string) => {
  const params = new URLSearchParams(search);

  const status = params.get("status");
  const sort = params.get("sort");
  const page = params.get("page") ? Number.parseInt(params.get("page")!) : 1;
  let filteredTasks: Task[] = [...tasks];

  if (status && ["todo", "inprogress", "pending", "done"].includes(status)) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  if (sort === "latest") {
    filteredTasks.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  const paginatedResult = paginatedTasks(filteredTasks, page, 5);

  return {
    tasks: paginatedResult,
    total: filteredTasks.length,
  };
};

export const paginatedTasks = (
  tasks: Task[],
  page: number,
  perPage: number
) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return tasks.slice(start, end);
};
