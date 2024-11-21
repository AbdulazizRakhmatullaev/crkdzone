import { supabase } from "@/lib/supaCli";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // const url = new URL(req.url);
        // const tg_id = url.searchParams.get("tg_id");

        const { data, error } = await supabase
            .from("User")
            .select("*")
            // .neq("tg_id", tg_id);

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ message: "Unable to retrieve users data", e }, { status: 500 })
    }
}