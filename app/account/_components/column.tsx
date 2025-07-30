import { DummyUser } from "@/app/_data/TableData";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DummyUser>[] = [
  {
    accessorKey: "sn",
    id: "accountSn",
    header: () => <div className="px-4 py-4 text-left">S/N</div>,
    cell: (info) => {
      const value = info.getValue() as string;
      return <div className="text-gray-600 px-4 py-4 ">#{value}</div>;
    },
  },
  {
    accessorKey: "accountName",
    id: "accountName",
    header: () => <div className="text-left px-4 py-4">ACCOUNT NAME</div>,
    meta: {
      className: "table-cell",
    },
    cell: (info) => {
      const value = info.getValue() as string;
      return (
        <div className="px-4 py-4 text-[#101828] font-medium text-base">{value}</div>
      );
    },
  },
  {
    accessorKey: "accountNumber",
    header: () => <div className="text-left px-4 py-4">ACCOUNT NUMBER</div>,
    meta: {
      className: "table-cell",
    },
    cell: (info) => {
      const value = info.getValue() as string;
      return <div className="text-gray-600 px-4 py-4">{value}</div>;
    },
  },
  {
    accessorKey: "gender",
    id: "gender",
    header: () => <div className="py-4 px-4 text-left">GENDER</div>,
    meta: {
      className: "table-cell",
    },
    cell: (info) => {
      const value = info.getValue() as string;
      return <div className="text-gray-600 px-4 py-4">{value}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    id: "phoneNumber",
    header: () => <div className="px-4 py-4 text-left">PHONE NUMBER</div>,
    meta: {
      className: "table-cell",
    },
    cell: (info) => {
      const value = info.getValue() as string;
      return <div className="text-gray-600 px-4 py-4 ">{value}</div>;
    },
  },
  {
    accessorKey: "bvnStatus",
    id: 'bvnStatus',
    header: () => <div className="text-left px-4 py-4">BVN STATUS</div>,
    meta: {
      className: "table-cell",
    },
    cell: (info) => {
      const value = info.getValue() as string;
      const color = value === "Submitted" ? "text-green-600" : "text-red-400";
      return <div className={`font-medium px-4 py-4 ${color}`}>{value}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    id: 'createdAt',
    header: () => <div className="px-4 py-4 text-left">CREATED AT</div>,
    cell: (info) => {
      const value = info.getValue() as string;
      return <div className="text-gray-600 px-4 py-4">{value}</div>;
    },
  },
  {
    accessorKey: "more",
    header: "",
    cell: () => <button className="px-4 py-4">...</button>,
  },
];
