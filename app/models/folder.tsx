import { mockFolders, mockTasks } from "~/contants/mock";
import { Folder } from "~/contants/types";

export const getFolders = async () => {
  const taskCountMap = mockTasks.reduce(
    (map: { [key: string]: number }, task) => {
      map[task.folderId] = (map[task.folderId] || 0) + 1;
      return map;
    },
    {}
  );

  return mockFolders.map((folder) => {
    if (folder.id === "all") return { ...folder, taskCount: mockTasks.length };
    return {
      ...folder,
      taskCount: taskCountMap[folder.id] || 0,
    };
  });
};

export const getFolderByFolderId = async (folderId: String) => {
  return mockFolders.find((folder) => folder.id === folderId);
};

export const createFolder = async (folder: Folder) => {
  mockFolders.splice(2, 0, folder);
  return folder;
};

export const updateFolder = async (folder: Folder) => {
  const index = mockFolders.findIndex((f) => f.id === folder.id);
  if (index == -1) return false;
  mockFolders[index] = folder;
  return true;
};

export const deleteFolder = async (folderId: string) => {
  const index = mockFolders.findIndex((folder) => folder.id === folderId);
  const taskCount = mockTasks.reduce((count, task) => {
    if (task.folderId === mockFolders[index].id) {
      count++;
    }
    return count;
  }, 0);
  if (index == -1 || mockFolders[index].isDefault === true || taskCount > 0) {
    return false;
  }
  mockFolders.splice(index, 1);
  return true;
};
