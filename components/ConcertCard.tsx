import { formatRupiah } from "@/lib/helpers/formatHelper";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import SpotlightCard from "./SpotlightCard";

type ConcertCardProps = {
    id: string;
    image: string;
    title: string;
    venue: string;
    date: string;
    time: string;
    location: string;
    currentCapacity: number;
    maxCapacity: number;
    price: number;
};

export default function ConcertCard({ id, title, image, venue, date, time, location, currentCapacity, maxCapacity, price }: ConcertCardProps) {
    return (
        <SpotlightCard className="flex flex-col border-2 bg-(--background) border-indigo-500/50 rounded-xl max-w-md overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:shadow-indigo-700/80 transition-all duration-500 group">
            <div className="w-full h-56 overflow-hidden">
                <img
                    src={image}
                    alt="concert"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-6 flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-lg">{title}</h1>
                    <p className="text-sm text-gray-500">{venue}</p>
                </div>
                <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <p className="text-gray-400">{date} • {time}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <p className="text-gray-400">{location}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                        </svg>
                        <p className="text-gray-400">{currentCapacity} / {maxCapacity}</p>
                    </div>
                </div>
                <div>
                    <LinearProgress variant="determinate" value={(currentCapacity / maxCapacity) * 100} sx={{
                        height: 5,
                        borderRadius: 5,
                        backgroundColor: "#374151",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#3b82f6",
                        },
                    }} />
                </div>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center mt-2">
                    <p className="text-indigo-500 text-2xl font-semibold">{formatRupiah(price)}</p>
                    <Link href={`/concert/${id}`} className="w-full lg:w-auto flex justify-center items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 group-hover:drop-shadow-lg group-hover:drop-shadow-indigo-700 transition-all py-2 px-3 text-sm rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                            <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                        </svg>
                        <p>Buy Ticket</p>
                    </Link>
                </div>
            </div>
        </SpotlightCard>
    );
}
