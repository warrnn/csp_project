"use server";

import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient();

        const { email, password } = await request.json();

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Signed in successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}