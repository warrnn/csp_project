"use server";

import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient();

        const { email, password } = await request.json();

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

        if (signInError) {
            return NextResponse.json({ error: signInError.message }, { status: 400 });
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        return NextResponse.json({ message: "Signed in successfully!", user_id: user.id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}