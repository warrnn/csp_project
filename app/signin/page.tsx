"use client";

import DarkVeil from "@/components/DarVeil";
import { ErrorResponse } from "@/lib/responseAlert";
import axios from "axios";
import Link from "next/link";

export default function SignIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        axios.post('/api/signin', {
            email,
            password
        }).then(() => {
            window.location.href = '/';
        }).catch((error) => {
            ErrorResponse({ message: error.response.data.error });
        })
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <DarkVeil />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 mt-8">
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
                            <path
                                fillRule="evenodd"
                                d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">
                            Welcome Back
                        </h1>
                        <p className="text-sm sm:text-base text-gray-400">
                            Sign in to access your tickets
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
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
                                required
                                className="border border-indigo-500/50 bg-black/30 py-2 px-3 rounded-md w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <input
                            type="submit"
                            value="Sign In"
                            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 py-2 rounded-md cursor-pointer   w-full text-sm sm:text-base font-semibold"
                        />
                    </form>

                    <div className="pt-4 flex space-x-2 items-center text-center">
                        <p className="text-gray-400 text-sm">Don&apos;t have an account?</p>
                        <Link
                            href="/signup"
                            className="text-indigo-500 hover:text-indigo-600 text-sm transition-all"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
