import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type Params = {
    id: string;
};

export async function GET(request: Request, context: { params: Promise<Params> }) {
    try {
        const supabase = await createServerClient();

        const { id } = await context.params;

        const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}