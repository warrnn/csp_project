import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-(--background) text-(--foreground)">
            <Header />
            {children}
        </main>);
}