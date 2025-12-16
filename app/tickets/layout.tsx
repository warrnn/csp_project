"use client";

import { useAuth } from "@/contexts/AuthProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { profile } = useAuth();

    if (profile?.role != 'user') {
        return (
            <section className="w-full min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold text-gray-400">Access Denied</h1>
            </section>
        );
    }

    return (
        <>{children}</>
    );
}
