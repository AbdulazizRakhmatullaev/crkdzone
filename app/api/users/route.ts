import { supabase } from "@/lib/supaCli";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("User")
            .select("*")

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ message: "Unable to retrieve users data", e }, { status: 500 })
    }
}