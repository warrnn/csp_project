import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type Params = {
    id: string
}

export async function GET(request: Request, context: { params: Promise<Params> }) {
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

export async function DELETE(request: Request, context: { params: Promise<Params> }) {
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

export async function PATCH(request: Request, context: { params: Promise<Params> }) {
    try {
        const supabase = await createServerClient();
        const { id } = await context.params;

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const artist = formData.get('artist') as string;
        const description = formData.get('description') as string;
        const venue = formData.get('venue') as string;
        const concert_date = formData.get('concert_date') as string;
        const price = formData.get('price') as string;
        const total_tickets = formData.get('total_tickets') as string;
        const poster = formData.get('poster') as File | null;

        if (!title || !artist || !description || !venue || !concert_date || !price || !total_tickets) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const { data: existingConcert, error: fetchError } = await supabase
            .from('concerts')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !existingConcert) {
            return NextResponse.json({ error: "Concert not found" }, { status: 404 });
        }

        let posterUrl = existingConcert.poster_url;
        let posterName = existingConcert.file_name;

        if (poster) {
            if (posterName) {
                await supabase.storage.from('images').remove([posterName]);
            }

            const fileName = `${Date.now()}-${poster.name}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(fileName, poster);

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
            posterUrl = publicUrlData.publicUrl;
            posterName = fileName;
        }

        const { data, error } = await supabase
            .from('concerts')
            .update({
                title,
                artist,
                description,
                venue,
                concert_date,
                price: Number(price),
                total_tickets: Number(total_tickets),
                available_tickets: Number(total_tickets), 
                poster_url: posterUrl,
                file_name: posterName
            })
            .eq('id', id)
            .select()
 
        const soldTickets = existingConcert.total_tickets - existingConcert.available_tickets;
        const newTotal = Number(total_tickets);
        const newAvailable = newTotal - soldTickets;

        if (newAvailable < 0) {
             return NextResponse.json({ error: "New total tickets cannot be less than sold tickets" }, { status: 400 });
        }

        const { data: updatedData, error: updateError } = await supabase.from('concerts').update({
             title,
             artist,
             description,
             venue,
             concert_date,
             price: Number(price),
             total_tickets: newTotal,
             available_tickets: newAvailable,
             poster_url: posterUrl,
             file_name: posterName
        }).eq('id', id).select().single();


        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 400 });
        }

        return NextResponse.json(updatedData, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}