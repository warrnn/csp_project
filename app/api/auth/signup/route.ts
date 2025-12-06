"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerClient();
        const { fullName, email, password } = await request.json();

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { fullName },
            },
        });

        if (authError) {
            revalidatePath('/signup');
            return NextResponse.json({ error: authError.message }, { status: 400 })
        }

        const loggedInUser = await supabase.auth.getUser();
        const { error: profileError } = await supabase.from('profiles').insert({
            id: loggedInUser.data.user?.id,
            email: email,
            full_name: fullName,
            role: 'user'
        });

        if (profileError) {
            revalidatePath('/signup');
            return NextResponse.json({ error: profileError.message }, { status: 400 })
        }

        return NextResponse.json({ message: "Account created successfully!" }, { status: 200 });
    } catch (error) {
        revalidatePath('/signup');
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}