import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createServerClient();

        const { data: { user }, error: sessionError } = await supabase.auth.getUser();

        if (sessionError || !user) {
            return NextResponse.json({ user: null, profile: null }, { status: 206 });
        }

        const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();

        if (profileError) {
            return NextResponse.json({ user, profile: null }, { status: 206 });
        }

        return NextResponse.json({ user, profile }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}