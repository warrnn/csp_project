import { useAuth } from "@/contexts/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const { user, profile, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleLogout = async () => {
        axios.post('/api/auth/logout')
            .then(() => {
                window.location.href = '/signin';
            })
            .catch((error) => {
                console.error(error);
                window.location.href = '/signin';
            });
    }

    const renderNavItems = (isMobile = false) => {
        const containerClass = isMobile
            ? "flex flex-col space-y-4 p-4"
            : "flex items-center space-x-2";

        const linkClass = "flex items-center space-x-1.5 font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer";

        if (!user) {
            return (
                <div className={isMobile ? "flex flex-col space-y-2 p-4" : "flex space-x-2"}>
                    <Link href="/signin" className="text-sm border border-indigo-500 py-2 px-4 rounded-lg transition-all hover:bg-pink-400 hover:border-pink-400 text-center text-white">Sign In</Link>
                    <Link href="/signup" className="text-sm border border-indigo-500 bg-indigo-500 py-2 px-4 rounded-lg transition-all hover:bg-indigo-600 hover:border-indigo-600 text-center text-white">Get Started</Link>
                </div>
            );
        }

        if (profile?.role === 'user') {
            // User Role
            return (
                <div className={containerClass}>
                    <Link href="/" className={`${linkClass} text-indigo-400 hover:text-white hover:bg-pink-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
                        </svg>
                        <span>Concerts</span>
                    </Link>
                    <Link href="/tickets" className={`${linkClass} text-white hover:bg-pink-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                            <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                        </svg>
                        <span>My Tickets</span>
                    </Link>
                    <button onClick={handleLogout} type="button" className={`${linkClass} text-red-500 hover:text-white hover:bg-red-500`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                        </svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            );
        } else {
            // Admin Role
            return (
                <div className={containerClass}>
                    <Link href="/" className={`${linkClass} text-indigo-400 hover:text-white hover:bg-pink-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
                        </svg>
                        <span>Concerts</span>
                    </Link>
                    <Link href="/admin/manage" className={`${linkClass} text-white hover:bg-pink-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
                        </svg>
                        <span>Manage Concerts</span>
                    </Link>
                    <Link href="/admin/scan" className={`${linkClass} text-white hover:bg-pink-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                            <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                            <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                            <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                            <path d="M12 9h2V8h-2z" />
                        </svg>
                        <span>Scan Tickets</span>
                    </Link>
                    <button onClick={handleLogout} type="button" className={`${linkClass} text-red-500 hover:text-white hover:bg-red-500`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                        </svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            );
        }
    }

    return (
        <nav className="w-full h-20 border-b border-indigo-500/75 z-[999] fixed">
            <div className="w-full h-full bg-slate-900/50 backdrop-blur-md relative">
                <div className="w-full h-full flex justify-between items-center px-4">
                    <Link href="/" className="flex space-x-2 items-center drop-shadow-lg drop-shadow-indigo-500 transition-all hover:drop-shadow-indigo-600 hover:scale-105 z-50">
                        <Image src="/assets/images/ticketwave.png" alt="ticketwave" width={75} height={0} />
                        <h1 className="text-xl font-bold text-white">TicketWave</h1>
                    </Link>

                    <div className="hidden min-[860px]:flex h-full items-center">
                        {renderNavItems(false)}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="min-[860px]:hidden text-white p-2 focus:outline-none z-50"
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        )}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="min-[860px]:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-indigo-500/75 backdrop-blur-md animate-fade-in-down">
                        {renderNavItems(true)}
                    </div>
                )}
            </div>
        </nav>
    );
}