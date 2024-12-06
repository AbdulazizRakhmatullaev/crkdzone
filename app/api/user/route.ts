import { supabase } from "@/lib/supaCli";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const tg_id = await url.searchParams.get("tg_id");

        const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("tg_id", tg_id);

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ message: "Unable to retrieve this user.", e }, { status: 500 });
    }
}