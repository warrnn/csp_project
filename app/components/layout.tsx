"use client";

import { useEffect } from "react";
import Header from "./header";
import Lenis from "lenis";

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true
        });
    })

    return (
        <main className="bg-(--background) text-(--foreground)">
            <Header />
            {children}
        </main>);
}