import { DummyUser } from "@/app/_data/TableData";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DummyUser>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="text-gray-600 px-4 ">#{value}</span>;
    },
  },
  {
    accessorKey: "accountName",
    header: "ACCOUNT NAME",
  },
  {
    accessorKey: "accountNumber",
    header: "ACCOUNT NUMBER",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="text-gray-600 px-4 py-4">{value}</span>;
    },
  },
  {
    accessorKey: "gender",
    header: "GENDER",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="text-gray-600 px-4 py-4">{value}</span>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE NUMBER",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="text-gray-600 px-4 py-4">{value}</span>;
    },
  },
  {
    accessorKey: "bvnStatus",
    header: "BVN STATUS",
    cell: (info) => {
      const value = info.getValue() as string;
      const color = value === "Submitted" ? "text-green-600" : "text-red-400";
      return <div className={`font-medium px-4 py-4 ${color}`}>{value}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="text-gray-600">{value}</span>;
    },
  },
  {
    accessorKey: "more",
    header: "",
    cell: () => <button>...</button>,
  },
];
