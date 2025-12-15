import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
    }

    const { data, error } = await supabase.from('tickets').select(`*, concerts(*)`).eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
}

export async function POST(request: Request) {
    const supabase = await createServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
    }

    const requestBody = await request.json();

    const { error } = await supabase.from('tickets').insert([
        {
            concert_id: requestBody.concert_id,
            user_id: user.id,
            quantity: requestBody.quantity
        }
    ]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json("Ticket created successfully", { status: 200 });
}