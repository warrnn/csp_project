import { formatDateTimeEnUS } from "@/lib/helpers/formatHelper";
import Link from "next/link";

type TicketCardProps = {
    id: string;
    title: string;
    artist: string;
    datetime: string;
    venue: string;
    quantity: number;
    image: string;
    isValidated: boolean;
}

export default function TicketCard({ id, title, artist, datetime, venue, quantity, image, isValidated }: TicketCardProps) {
    return (
        <Link href={`/tickets/${id}`} className="transition-all cursor-pointer grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-(--background) hover:bg-(--background)/95 border-2 border-indigo-600/50 border-dashed hover:drop-shadow-md hover:drop-shadow-indigo-500 p-8 hover:-translate-y-1 rounded-xl"
            data-aos="flip-down"
            data-aos-duration="1000">
            <div className="flex flex-col sm:flex-row gap-6 sm:col-span-2 lg:col-span-1 max-lg:mb-4">
                <img src={image}
                    alt={title}
                    className="object-cover size-36 rounded-lg" />
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold">{title}</h1>
                    <h2 className="text-sm text-indigo-500">{artist}</h2>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-400">Date & Time</p>
                        <p>{formatDateTimeEnUS(datetime)}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-400">Venue</p>
                        <p>{venue}</p>
                    </div>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                        <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                        <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-400">Quantity</p>
                        <p>{quantity} Tickets</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-indigo-500" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className={isValidated ? "text-green-500" : "text-red-500"}>{isValidated ? "Validated" : "Not validated"}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}