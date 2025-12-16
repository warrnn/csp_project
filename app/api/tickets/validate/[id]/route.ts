import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type Params = {
    id: string;
};

export async function PUT(request: Request, context: { params: Promise<Params> }) {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    const { id } = await context.params;

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
    }

    const { data: ticket, error: fetchError } = await supabase.from('tickets').select('*').eq('id', id).single();

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 400 });
    }

    if (ticket.is_validated) {
        return NextResponse.json({ error: "Ticket already validated" }, { status: 400 });
    }

    const { error } = await supabase.from('tickets').update({
        is_validated: true,
        validated_at: new Date().toISOString(),
        validated_by: user.id
    }).eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Ticket validated successfully!" }, { status: 200 });
}