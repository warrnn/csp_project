import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type params = {
    id: string
}

export async function GET(request: Request, context: { params: params }) {
    try {
        const supabase = await createServerClient();

        const { id } = await context.params;

        const { data, error } = await supabase.from('concerts').select('*').eq('id', id).single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function DELETE(request: Request, context: { params: params }) {
    try {
        const supabase = await createServerClient();

        const { id } = await context.params;

        const { data, error } = await supabase.from('concerts').select('*').eq('id', id).single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        if (!data) {
            return NextResponse.json({ error: "Concert not found" }, { status: 400 })
        }

        const { error: storageError } = await supabase.storage.from('images').remove([data.file_name]);

        if (storageError) {
            return NextResponse.json({ error: storageError.message }, { status: 400 })
        }

        const { error: deleteError } = await supabase.from('concerts').delete().eq('id', id);

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 400 })
        }

        return NextResponse.json({ message: "Concert deleted successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}