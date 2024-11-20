import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { tg_id, username, avatar_url } = await req.json();
        const dateTime = new Date().toISOString(); // Supabase uses strings for dates

        // Check if the user already exists
        const { data: existingUser, error: fetchError } = await supabase
            .from('user')
            .select('*')
            .eq('tg_id', tg_id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // Handle any errors that are not "Row not found" (PGRST116)
            throw new Error(fetchError.message);
        }

        let user = existingUser;

        if (!existingUser) {
            // If user does not exist, create a new user
            const { data: newUser, error: createError } = await supabase
                .from('user')
                .insert([
                    {
                        tg_id,
                        username,
                        avatar_url,
                        balance: 0,
                        friends: 0,
                        authDate: dateTime,
                    },
                ])
                .select()
                .single(); // Ensure we return the created user

            if (createError) {
                throw new Error(createError.message);
            }

            user = newUser;
        }

        return NextResponse.json(user);
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json(
                { message: "Unable to check or create user", error: e.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "An unexpected error occurred", error: String(e) },
            { status: 500 }
        );
    }
}
