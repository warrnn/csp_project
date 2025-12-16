"use client"

import DarkVeil from "@/components/DarVeil"
import { ErrorResponse, SuccessResponse } from "@/lib/responseAlert";
import axios from "axios";
import { useState } from "react";
import { IoScan } from "react-icons/io5";

export default function ScanPage() {
  const [ticketId, setTicketId] = useState("");

  const handleValidateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticketId) return;

    try {
      await axios.put(`/api/tickets/validate/${ticketId}`).then(() => {
        SuccessResponse({ title: "Success", message: "Ticket validated successfully!" });
      }).catch((error) => {
        ErrorResponse({ message: "Ticket not found" });
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTicketId("");
    }
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <DarkVeil speed={1} />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center mt-8">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full p-4 bg-indigo-950 w-fit drop-shadow-sm drop-shadow-indigo-500 items-center">
            <IoScan className="text-4xl text-indigo-400" />
          </div>
          <p className="text-center text-white text-lg font-light mt-4">Ticket Validator</p>
          <p className="text-center text-gray-400 text-lg font-extralight mt-2">Scan or enter QR code to validate tickets</p>

          <form
            onSubmit={handleValidateTicket}
            className="mt-6 px-8 py-6 bg-(--background)/75 backdrop-blur-md border border-indigo-500/75 rounded-xl flex flex-col w-[380px] self-center shadow-xl shadow-indigo-500/20"
          >
            <p className="text-white font-medium">QR Code</p>

            <input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              type="text"
              placeholder="Enter ID or scan QR code"
              className="mt-2 w-full px-4 py-2 border border-indigo-900 rounded-md focus:outline-none focus:border-indigo-500 placeholder:text-sm"
            />

            <button
              type="submit"
              className="cursor-pointer mt-4 w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <IoScan className="text-xl text-white" />
              Scan Ticket
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}