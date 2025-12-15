"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import Lenis from "lenis";
import AOS from "aos";
import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import CountUp from "./CountUp";

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [loading]);

    return (
        <main className="bg-(--background) text-(--foreground)">
            {
                showLoader && (
                    <div className={`fixed inset-0 z-99999 flex items-center justify-center bg-(--background) transition-all duration-1000 ease-out ${loading ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}>
                        <CountUp
                            from={0}
                            to={100}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text text-8xl font-bold"
                        />
                    </div>
                )
            }
            <Header />
            {children}
        </main >
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        AOS.init();
        new Lenis({ autoRaf: true });
    }, []);

    return (
        <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
    );
}
