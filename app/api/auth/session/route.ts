import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createServerClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}