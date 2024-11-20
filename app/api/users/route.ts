import { supabase } from "@/lib/supaCli";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let { tg_id } = await req.json()

        const { data, error } = await supabase
            .from("User")
            .select("*")
            .neq("tg_id", tg_id);

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ message: "Unable to retrieve users data", e }, { status: 500 })
    }
}