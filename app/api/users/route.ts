import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await supabase.from("User").select("*")

        return NextResponse.json(users.data);
    } catch (e) {
        return NextResponse.json({ message: "Unable to retrieve users data", e }, { status: 500 })
    }
}