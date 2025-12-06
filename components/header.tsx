import { useAuth } from "@/contexts/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const { user, loading } = useAuth();

    const handleLogout = async () => {
        axios.post('/api/auth/logout')
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                window.location.reload();
            });
    }

    return (
        <nav className="w-full h-20 border-b border-indigo-500/75 z-999 fixed">
            <div className="w-full h-full bg-slate-900/50 backdrop-blur-md">
                <div className="w-full h-full flex justify-between px-4">
                    <Link href="/" className="flex space-x-2 items-center drop-shadow-lg drop-shadow-indigo-500 transition-all hover:drop-shadow-indigo-600 hover:scale-105">
                        <Image src="/assets/images/ticketwave.png" alt="ticketwave" width={75} height={0} />
                        <h1 className="text-xl">TicketWave</h1>
                    </Link>
                    <div className="h-full flex items-center">
                        {
                            loading ? (
                                <div className="flex space-x-2">
                                    <div className="animate-pulse w-32 h-10 bg-slate-700 rounded-lg"></div>
                                    <div className="animate-pulse w-32 h-10 bg-slate-700 rounded-lg"></div>
                                    <div className="animate-pulse w-32 h-10 bg-slate-700 rounded-lg"></div>
                                </div>
                            ) : user ? (
                                <div className="flex space-x-2">
                                    <Link href="/" className="flex items-center space-x-1 font-semibold py-2 text-indigo-400 hover:text-white px-4 rounded-lg transition-all hover:bg-pink-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
                                        </svg>
                                        <span>Concerts</span>
                                    </Link>
                                    <Link href="/tickets" className="flex items-center space-x-2 font-semibold text-white py-2 px-4 rounded-lg transition-all hover:bg-pink-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                                            <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                                        </svg>
                                        <span>My Tickets</span>
                                    </Link>
                                    <button onClick={handleLogout} type="button" className="flex items-center space-x-1.5 font-semibold text-red-500 hover:text-white py-2 px-4 rounded-lg transition-all hover:bg-red-500 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                                        </svg>
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <Link href="/signin" className="text-sm border border-indigo-500 py-2 px-4 rounded-lg transition-all hover:bg-pink-400 hover:border-pink-400">Sign In</Link>
                                    <Link href="/signup" className="text-sm border border-indigo-500 bg-indigo-500 py-2 px-4 rounded-lg transition-all hover:bg-indigo-600 hover:border-indigo-600">Get Started</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}