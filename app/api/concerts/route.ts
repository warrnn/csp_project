import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createServerClient();

        const { data, error } = await supabase.from('concerts').select('*');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json(data, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();

        const posterFile = formData.get("poster") as File;

        const title = formData.get("title") as string;
        const artist = formData.get("artist") as string;
        const description = formData.get("description") as string;
        const venue = formData.get("venue") as string;
        const concert_date = formData.get("concert_date") as string;
        const price = formData.get("price") as string;
        const total_tickets = formData.get("total_tickets") as string;

        let posterUrl = "";
        let fileName = "";

        if (posterFile) {
            fileName = `${Date.now()}-${posterFile.name.replaceAll(" ", "_")}`;

            const { error: uploadError } = await supabase.storage
                .from("images")
                .upload(`posters/${fileName}`, posterFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                console.error("Upload Error:", uploadError);
                return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
            }

            const { data: publicUrlData } = supabase.storage
                .from("images")
                .getPublicUrl(`posters/${fileName}`);

            posterUrl = publicUrlData.publicUrl;
        }

        const { data, error: dbError } = await supabase
            .from("concerts")
            .insert([
                {
                    title,
                    artist,
                    description,
                    venue,
                    concert_date,
                    poster_url: posterUrl,
                    price: Number(price),
                    total_tickets: Number(total_tickets),
                    available_tickets: Number(total_tickets),
                    created_by: user.id,
                    file_name: `posters/${fileName}`,
                },
            ])
            .select()
            .single();

        if (dbError) {
            return NextResponse.json({ error: dbError.message }, { status: 400 });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}