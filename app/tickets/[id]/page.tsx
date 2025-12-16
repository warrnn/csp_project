"use client";

import { formatShortDateTimeEnUS } from "@/lib/helpers/formatHelper";
import { Ticket } from "@/lib/models";
import axios from "axios";
import { CalendarDays, MapPin, Users, CreditCard, Ticket as TicketIcon } from "lucide-react"; // Import Icons
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function TicketDetail() {
    const params = useParams();
    const ticketId = params.id;

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`/api/tickets/${ticketId}`);
                console.log(response.data);
                setTicket(response.data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicket();
    }, [ticketId]);

    if (isLoading) {
        return (
            <section className="w-full min-h-screen flex items-center justify-center">
                <div className="size-16 rounded-full border-b-2 border-indigo-500 animate-spin"></div>
            </section>
        );
    }

    return (
        <section className="w-full min-h-screen px-4 py-12 md:py-20 flex justify-center items-center">
            <div className="mt-8 relative w-full max-w-md md:max-w-xl shadow-2xl rounded-3xl overflow-hidden flex flex-col">
                <div className="w-full h-48 md:h-64 overflow-hidden relative">
                    <img
                        src={ticket?.concerts.poster_url}
                        alt={ticket?.concerts.title}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="text-white">
                            <span className={`${ticket?.is_validated ? "bg-green-500" : "bg-red-500"} text-xs font-bold px-2 py-1 rounded text-white inline-block`}>
                                {ticket?.is_validated ? "Validated" : "Not validated"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 flex-1 relative bg-white">
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {ticket?.concerts.title}
                        </h1>
                        <p className="text-lg text-indigo-600 font-medium mt-1">
                            {ticket?.concerts.artist}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <CalendarDays size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Date & Time</p>
                                <p className="font-semibold text-gray-800 text-sm md:text-base">
                                    {formatShortDateTimeEnUS(ticket?.concerts.concert_date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Venue</p>
                                <p className="font-semibold text-gray-800 text-sm md:text-base">
                                    {ticket?.concerts.venue}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Users size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Quantity</p>
                                <p className="font-semibold text-gray-800 text-sm md:text-base">
                                    {ticket?.quantity} Person
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Purchased At</p>
                                <p className="font-semibold text-gray-800 text-sm md:text-base">
                                    {formatShortDateTimeEnUS(ticket?.purchase_date)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full">
                    <div className="absolute -top-4 -left-4 size-8 bg-(--background) rounded-full z-10"></div>

                    <div className="absolute -top-4 -right-4 size-8 bg-(--background) rounded-full z-10"></div>
                </div>

                <div className="bg-gray-300 p-6 md:p-8 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2 text-black mb-1">
                        <TicketIcon size={16} />
                        <span>Scan this code at the venue</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <QRCode
                            value={ticket?.id as string}
                            size={180}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                            level="M"
                            bgColor="#ffffff"
                            fgColor="#4f46e5"
                        />
                    </div>

                    <p className="text-sm font-mono text-indigo-400 bg-white px-3 py-1 rounded border border-indigo-100">
                        ID: {ticket?.id}
                    </p>
                </div>

            </div>
        </section>
    )
}