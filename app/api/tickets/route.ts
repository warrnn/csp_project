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
    const concertId = requestBody.concert_id;
    const quantity = requestBody.quantity;

    const { data: concert, error: fetchError } = await supabase.from('concerts').select('*').eq('id', concertId).single();
    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (concert.available_tickets < quantity) {
        return NextResponse.json({ error: "Not enough tickets available" }, { status: 400 });
    }

    const { error } = await supabase.from('tickets').insert([
        {
            concert_id: concertId,
            user_id: user.id,
            quantity: quantity
        }
    ]);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { error: updateError } = await supabase.from('concerts')
        .update({ available_tickets: concert.available_tickets - quantity })
        .eq('id', concertId);
    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json("Ticket created successfully", { status: 200 });
}