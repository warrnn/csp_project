"use client"

import { formatRupiah, formatShortDateTimeEnUS } from "@/lib/helpers/formatHelper";
import { Concert } from "@/lib/models";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react"
import { HiPencil, HiTrash, HiOutlineCalendar, HiOutlineUsers } from "react-icons/hi";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/concerts/${id}`);
          setConcerts((prevData) => prevData.filter((concert) => concert.id !== id));
        } else {
          return
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("/api/concerts");
        setConcerts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const columns = useMemo<ColumnDef<Concert>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Concert",
        cell: info => (
          <span className="text-white font-medium">{info.getValue<string>()}</span>
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
        accessorKey: "concert_date",
        header: "Date",
        cell: info => (
          <span className="flex items-center gap-2">
            <HiOutlineCalendar className="w-5 h-5 text-indigo-500" />
            <span className="text-white">{formatShortDateTimeEnUS(info.getValue<string>())}</span>
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
        id: "quota",
        header: "Quota",
        cell: ({ row }) => {
          const total = row.original.total_tickets;
          const available = row.original.available_tickets;
          const sold = total - available;
          const percent = total > 0 ? (sold / total) * 100 : 0;

          return (
            <div>
              <div className="flex items-center gap-2 text-sm">
                <HiOutlineUsers className="w-4 h-4 text-gray-400" />
                <span className="text-white">
                  {sold} <span className="text-gray-500">/ {total} Sold</span>
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded mt-1 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded transition-all duration-500"
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
          <span className="text-white">{formatRupiah(info.getValue<number>())}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button title="Edit" className="p-2 rounded hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 transition cursor-pointer">
              <HiPencil className="w-5 h-5" />
            </button>
            <button onClick={() => handleDelete(row.original.id as string)} title="Delete" className="p-2 rounded hover:bg-red-600/20 text-red-400 hover:text-red-300 transition cursor-pointer">
              <HiTrash className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable<Concert>({
    data: concerts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-950">
      <div className="absolute inset-0 z-10 flex flex-col mt-20 py-8 px-16">
        <div className="flex w-full justify-between items-end">
          <div className="flex flex-col">
            <h1 className="text-white text-3xl font-bold tracking-tight">Concert Management</h1>
            <p className="text-gray-400 text-lg font-light mt-1">Manage all concerts and events</p>
          </div>
          <div className="flex justify-end">
            <Link href={"manage/add"}
              className="px-4 py-2 flex items-center rounded-lg text-white font-semibold bg-linear-to-r from-indigo-700 via-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/20 transition hover:scale-105 active:scale-95"
            >
              Add Concert
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-6 overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-10 text-gray-400 animate-pulse">
              Loading data...
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-gray-800">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-800">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-800/50 transition-colors">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-4 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                      No concerts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}