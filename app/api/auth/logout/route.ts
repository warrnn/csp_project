import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const supabase = await createServerClient();

        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            await supabase.auth.signOut();
        }

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

    return NextResponse.json({ message: "Signed out successfully!" }, { status: 200 });
}