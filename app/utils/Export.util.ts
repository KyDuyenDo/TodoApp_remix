import * as XLSX from "xlsx";
export const exportUtil = (op: string) => {
    if (typeof window === "undefined") return;
    const tasks = JSON.parse(
        window.localStorage.getItem(op) || "[]"
    );
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
