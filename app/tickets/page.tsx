'use client';

import TicketCard from "@/components/TicketCard";
import { Ticket } from "@/lib/models";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TicketsPage() {
    const [showValidated, setShowValidated] = useState(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/tickets');
                setTickets(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const filteredTickets = tickets.filter(
        ticket => ticket.is_validated === showValidated
    );

    return (
        <section className="w-full min-h-screen px-8">
            <div className="pt-28 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">My Tickets</h1>
                <p>View and manage your concert tickets</p>
            </div>

            <div className="mt-8 flex justify-center items-center">
                <div className="bg-gray-700 py-2 px-4 text-sm flex gap-2 rounded-full">
                    <button
                        onClick={() => setShowValidated(false)}
                        className={`${!showValidated ? "bg-gray-800" : ""} w-32 py-1 px-2 rounded-full cursor-pointer`}
                    >
                        Upcoming
                    </button>

                    <button
                        onClick={() => setShowValidated(true)}
                        className={`${showValidated ? "bg-gray-800" : ""} w-32 py-1 px-2 rounded-full cursor-pointer`}
                    >
                        Validated
                    </button>
                </div>
            </div>

            <div className="mt-8 pb-16 flex flex-col gap-4">
                {
                    isLoading ? <div className="size-16 rounded-full border-b-2 border-indigo-500 animate-spin self-center mt-16"></div> :
                        filteredTickets.length === 0 ? <p className="text-center text-gray-400 p-8">No tickets found</p> :
                            filteredTickets
                                .filter(ticket => ticket.concerts) // safety
                                .map(ticket => (
                                    <TicketCard
                                        key={ticket.id}
                                        id={ticket.id}
                                        title={ticket.concerts!.title}
                                        artist={ticket.concerts!.artist}
                                        datetime={ticket.concerts!.concert_date}
                                        venue={ticket.concerts!.venue}
                                        quantity={ticket.quantity}
                                        image={ticket.concerts!.poster_url}
                                        isValidated={ticket.is_validated}
                                    />
                                ))
                }
            </div>
        </section>
    );
}
