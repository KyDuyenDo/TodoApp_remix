import { useState } from "react";
import { Button } from "~/components/ui/button";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { useFetcher, useParams } from "@remix-run/react";
import { Task } from "~/contants/types";
import { useTranslation } from "react-i18next";

export function ExcelImport() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const fetcher = useFetcher();
  const [fileInputKey, setFileInputKey] = useState(0);
  const {t} = useTranslation("main");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const data = await readExcelFile(file);
      const tasks = parseExcelData(data);
      if (tasks.length > 0) {
        await saveData(tasks);
      }
    } catch (error) {
      console.error("Error importing excel file:", error);
    } finally {
      setIsLoading(false);
      setFileInputKey((prev) => prev + 1);
      event.target.value = "";
    }
  };

  const readExcelFile = (file: File): Promise<any[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        try {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          resolve(json as any[][]);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const parseExcelData = (data: any[][]): Task[] => {
    const [headers, ...rows] = data;
    return rows.map((row) => {
      const task: Task = {
        id: uuidv4(),
        title: row[headers.indexOf("title")] || "New task",
        folderId:
          params.folderId === "all" ? "default" : params.folderId || "default",
        status: row[headers.indexOf("status")] || "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        time: new Date(row[headers.indexOf("time")]).toISOString(),
        note: row[headers.indexOf("note")] || "",
      };
      return task;
    });
  };

  const saveData = async (tasks: Task[]) => {
    const formData = new FormData();
    formData.append("tasks", JSON.stringify(tasks));

    fetcher.submit(formData, {
      method: "post",
      action: "/tasks",
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="excel-file-input"
        key={fileInputKey}
      />
      <Button
        onClick={() => document.getElementById("excel-file-input")?.click()}
        disabled={isLoading}
      >
        {isLoading ? "Importing..." : t("IMPORT")}
      </Button>
    </div>
  );
}
