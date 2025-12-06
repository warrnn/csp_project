"use client";

import { useEffect } from "react";
import Header from "./header";
import Lenis from "lenis";
import AOS from 'aos';
import { AuthProvider } from "@/contexts/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        AOS.init();
        const lenis = new Lenis({
            autoRaf: true
        });
    }, []);

    return (
        <AuthProvider>
            <main className="bg-(--background) text-(--foreground)">
                <Header />
                {children}
            </main>
        </AuthProvider>
    );
}