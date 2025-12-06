"use client";

import DarkVeil from "@/components/DarVeil";
import Link from "next/link";

export default function SignUp() {
    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <DarkVeil />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 mt-16">
                <div className="p-6 sm:p-8 bg-(--background)/75 backdrop-blur-md border border-indigo-500/75 rounded-xl flex flex-col items-center space-y-6 w-full max-w-md shadow-xl shadow-indigo-500/20">
                    <div className="rounded-full p-4 bg-indigo-950 w-fit drop-shadow-sm drop-shadow-indigo-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"  
                            height="32"
                            fill="currentColor"
                            className="text-indigo-400"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path d="M14 14s-1-4-6-4-6 4-6 4 1 1 6 1 6-1 6-1" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">
                            Create Account
                        </h1>
                        <p className="text-sm sm:text-base text-gray-400">
                            Join TicketWave and start exploring concerts
                        </p>
                    </div>

                    <form className="w-full flex flex-col space-y-6">
                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="name" className="text-sm">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className="border border-indigo-500/50 bg-black/30 py-2 px-3 rounded-md w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="border border-indigo-500/50 bg-black/30 py-2 px-3 rounded-md w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="border border-indigo-500/50 bg-black/30 py-2 px-3 rounded-md w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <input
                            type="submit"
                            value="Sign Up"
                            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 py-2 rounded-md cursor-pointer w-full text-sm sm:text-base font-semibold"
                        />
                    </form>

                    <div className="pt-4 flex space-x-2 items-center text-center">
                        <p className="text-gray-400 text-sm">Already have an account?</p>
                        <Link
                            href="/signin"
                            className="text-indigo-500 hover:text-indigo-600 text-sm transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
