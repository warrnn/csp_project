"use client";

import GlareHover from "@/components/GlareHover";
import { useAuth } from "@/contexts/AuthProvider";
import { formatDateTimeEnUS, formatRupiah } from "@/lib/helpers/formatHelper";
import { Concert } from "@/lib/models";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConcertPage() {
    const params = useParams();
    const id = params.id;

    const { user, profile, loading } = useAuth();
    const [concert, setConcert] = useState<Concert>({} as Concert);
    const [ticketQuantity, setTicketQuantity] = useState(1);

    const handleTicketQuantityChange = (operation: string) => {
        if (operation === "increment") {
            if (ticketQuantity < 10) {
                setTicketQuantity(ticketQuantity + 1);
            }
        } else if (operation === "decrement") {
            if (ticketQuantity > 1) {
                setTicketQuantity(ticketQuantity - 1);
            }
        }
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchConcerts = async () => {
            try {
                const response = await axios.get(`/api/concerts/${params.id}`);
                setConcert(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchConcerts();
    }, [id]);

    return (
        <main className="p-8">
            <section className="pt-20 flex items-center justify-start">
                <div className="flex space-x-2 items-center hover:text-indigo-400 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                    <Link href="/" className="">Back to Concerts</Link>
                </div>
            </section>
            <section className="w-full h-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:sticky lg:top-24 h-fit">
                        <img
                            src={concert.poster_url}
                            alt=""
                            className="border-2 border-indigo-500/50 rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-xl">{concert.title}</h1>
                        <h2 className="text-xl text-indigo-500">{concert.artist}</h2>
                        <div className="p-6 mt-4 border border-indigo-500 rounded-xl flex flex-col space-y-3">
                            <div className="flex space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-indigo-500 mt-1" viewBox="0 0 16 16">
                                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                                    <path d="M3.5 0a.5.5     0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                                <div className="text-gray-400 flex flex-col">
                                    <p className="text-sm">Date & Time</p>
                                    <p className="text-white">{formatDateTimeEnUS(concert.concert_date)}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-indigo-500 mt-1" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <div className="text-gray-400 flex flex-col">
                                    <p className="text-sm">Venue</p>
                                    <p className="text-white">{concert.venue}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-indigo-500 mt-1" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                </svg>
                                <div className="text-gray-400 flex flex-col w-full">
                                    <p className="text-sm">Availability</p>
                                    <p className="text-white">{concert.available_tickets} of {concert.total_tickets} seats remaining</p>
                                    <LinearProgress variant="determinate" className="mt-2.5" value={(concert.available_tickets / concert.total_tickets) * 100} sx={{
                                        height: 7.5,
                                        borderRadius: 5,
                                        backgroundColor: "#374151",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: "#3b82f6",
                                        },
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 mt-4 border border-indigo-500 rounded-xl flex flex-col space-y-3">
                            <p>About This Event</p>
                            <p className="text-gray-400">{concert.description}</p>
                        </div>
                        <div className="p-6 mt-4 border border-indigo-500 rounded-xl flex flex-col space-y-3">
                            <p>Purchase Tickets</p>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Ticket Price</p>
                                <p className="font-semibold text-indigo-500">{formatRupiah(concert.price)}</p>
                            </div>
                            {
                                user ? (
                                    profile?.role === 'user' && (
                                        <>
                                            <hr className="text-gray-600 mt-2 pb-2" />
                                            <div className="flex flex-col space-y-3">
                                                <p>Quantity</p>
                                                <div className="flex space-x-4 py-2 items-center">
                                                    <button onClick={() => handleTicketQuantityChange("increment")} title="plus" type="button" className="border border-indigo-500/50 rounded-lg p-2.5 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                                        </svg>
                                                    </button>
                                                    <p className="text-lg">{ticketQuantity}</p>
                                                    <button onClick={() => handleTicketQuantityChange("decrement")} title="minus" type="button" className="border border-indigo-500/50 rounded-lg p-2.5 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="pb-1">
                                                    <p className="text-sm text-gray-400">Maximum 10 tickets per purchase</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p>Total Amount</p>
                                                    <p className="font-semibold text-indigo-500">{formatRupiah(ticketQuantity * 500000)}</p>
                                                </div>
                                                <div>
                                                    <GlareHover
                                                        width="auto"
                                                        height="auto"
                                                        borderColor="transparent"
                                                        glareColor="#ffffff"
                                                        glareOpacity={0.5}
                                                        glareAngle={-30}
                                                        glareSize={300}
                                                        transitionDuration={800}
                                                        playOnce={false}
                                                        className="mt-2 hover:scale-[0.975] transition-all"
                                                    >
                                                        <Link href={"/"} title="buy tickets" type="button" className="w-full flex items-center justify-center space-x-2 text-white bg-linear-to-r from-indigo-500 to-pink-500 rounded-xl p-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                            </svg>
                                                            <span>Purchase Now</span>
                                                        </Link>
                                                    </GlareHover>


                                                </div>
                                            </div>

                                        </>
                                    )
                                ) : (
                                    <>
                                        <hr className="text-gray-600 mt-2 pb-2" />
                                        <div className="flex flex-col space-y-3">
                                            <p>Quantity</p>
                                            <div className="flex space-x-4 py-2 items-center">
                                                <button onClick={() => handleTicketQuantityChange("increment")} title="plus" type="button" className="border border-indigo-500/50 rounded-lg p-2.5 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                                    </svg>
                                                </button>
                                                <p className="text-lg">{ticketQuantity}</p>
                                                <button onClick={() => handleTicketQuantityChange("decrement")} title="minus" type="button" className="border border-indigo-500/50 rounded-lg p-2.5 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="pb-1">
                                                <p className="text-sm text-gray-400">Maximum 10 tickets per purchase</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p>Total Amount</p>
                                                <p className="font-semibold text-indigo-500">{formatRupiah(ticketQuantity * 500000)}</p>
                                            </div>
                                            <div>
                                                <GlareHover
                                                    width="auto"
                                                    height="auto"
                                                    borderColor="transparent"
                                                    glareColor="#ffffff"
                                                    glareOpacity={0.5}
                                                    glareAngle={-30}
                                                    glareSize={300}
                                                    transitionDuration={800}
                                                    playOnce={false}
                                                    className="mt-2 hover:scale-[0.975] transition-all"
                                                >
                                                    <Link href={"/signin"} title="sign in to buy" type="button" className="w-full flex items-center justify-center text-white bg-linear-to-r from-indigo-500 to-pink-500 rounded-xl p-3">Sign In To Purchase</Link>
                                                </GlareHover>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}