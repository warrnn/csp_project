import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="w-full h-20 border-b border-indigo-500/75 z-999 fixed">
            <div className="w-full h-full bg-slate-900/50 backdrop-blur-md">
                <div className="w-full h-full flex justify-between px-4">
                    <Link href="/" className="flex space-x-2 items-center drop-shadow-lg drop-shadow-indigo-500 transition-all hover:drop-shadow-indigo-600 hover:scale-105">
                        <Image src="/assets/images/ticketwave.png" alt="ticketwave" width={75} height={0} />
                        <h1 className="text-xl">TicketWave</h1>
                    </Link>
                    <div className="h-full flex items-center text-sm">
                        <Link href="/signin" className="border border-indigo-500 py-2 px-4 rounded-md transition-all hover:bg-pink-400 hover:border-pink-400">Sign In</Link>
                        <Link href="/signup" className="border border-indigo-500 bg-indigo-500 py-2 px-4 rounded-md ml-2 transition-all hover:bg-indigo-600 hover:border-indigo-600">Get Started</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}