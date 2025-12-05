"use client";

import { useEffect } from "react";
import Header from "./header";
import Lenis from "lenis";
import AOS from 'aos';

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        AOS.init();
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