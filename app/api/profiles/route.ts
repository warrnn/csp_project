import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createServerClient();
        const { data, error } = await supabase.from('profiles').select('*')

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}