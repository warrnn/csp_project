"use client"

import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react"
import { HiPencil, HiTrash, HiOutlineCalendar, HiOutlineUsers } from "react-icons/hi";

// ini dummy data ya ges
type Concert = {
  concert: string;
  artist: string;
  date: string;
  venue: string;
  quota: { current: number; total: number };
  price: string;
};

export default function DashboardPage() {
  const data: Concert[] = useMemo(
    () => [
      {
        concert: "Justin Bieber Concert",
        artist: "Justin Bieber",
        date: "2023-12-01",
        venue: "O2 Arena",
        quota: { current: 2500, total: 5000 },
        price: "Rp 500.000 ",
      },
    ],
    []
  )

  const columns = useMemo<ColumnDef<Concert>[]>(
    () => [
      {
        accessorKey: "concert",
        header: "Concert",
        cell: info => (
          <span className="text-white">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "artist",
        header: "Artist",
        cell: info => (
          <span className="text-gray-400">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: info => (
          <span className="flex items-center gap-2">
            <HiOutlineCalendar className="w-5 h-5 text-indigo-500" />
            <span className="text-white">{info.getValue<string>()}</span>
          </span>
        ),
      },
      {
        accessorKey: "venue",
        header: "Venue",
        cell: info => (
          <span className="text-gray-400">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "quota",
        header: "Quota",
        cell: info => {
          const quota = info.getValue<{ current: number; total: number }>()
          const percent = (quota.current / quota.total) * 100
          return (
            <div>
              <div className="flex items-center gap-2">
                <HiOutlineUsers className="w-5 h-5 text-gray-400" />
                <span className="text-white">{quota.current}/{quota.total}</span>
              </div>
              <div className="w-24 h-2 bg-gray-700 rounded mt-1">
                <div
                  className="h-2 bg-indigo-500 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: info => (
          <span className="text-white">{info.getValue<string>()}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex gap-2">
            <button className="p-2 rounded hover:bg-indigo-600 transition">
              <HiPencil className="w-5 h-5 text-indigo-400" />
            </button>
            <button className="p-2 rounded hover:bg-red-600 transition">
              <HiTrash className="w-5 h-5 text-red-400" />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable<Concert>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col mt-20 py-8 px-16">
        <div className="flex w-full justify-between">
          <div className="flex flex-col w-1/2">
            <p className="text-white text-2xl font-medium">Concert Management</p>
            <p className="text-gray-500 text-lg font-light">Manage all concerts and events</p>
          </div>
          <div className="flex justify-end w-1/2 ">
            <button
              className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 shadow-md transition hover:bg-indigo-600"
            >
              Add Concert
            </button>
          </div>
        </div>
        <div className="mt-8 bg-gray-900 rounded-lg shadow-lg p-6">
          <table className="min-w-full">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-2 text-left text-gray-300 font-semibold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-t border-gray-800">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
