import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { tg_id, username, avatar_url } = await req.json();
        const dateTime = new Date().toISOString(); // Format date as ISO string

        const { data: existingUser, error: fetchError } = await supabase
            .from('user')
            .select('*')
            .eq('tg_id', tg_id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error(fetchError.message);
        }

        let user = existingUser;

        if (!existingUser) {
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
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: "Unable to check or create user", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "An unexpected error occurred", error: String(error) },
            { status: 500 }
        );
    }
}
