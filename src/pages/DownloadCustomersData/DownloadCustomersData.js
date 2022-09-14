import "./DownloadCustomersData.css";
import axios from "axios";
import { useEffect, useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function DownloadCustomersData() {

  const [items, setItems] = useState(false);
  // let items = null;

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setItems(res.data);
        // console.log(items);
      })
      .catch(err => console.log(err));
  }, [items]);

  let fileName = "document";
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (items, fileName) => {
    const ws = XLSX.utils.json_to_sheet(items);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button onClick={(e) => exportToCSV(items, fileName)}>Export</button>
  );
};

