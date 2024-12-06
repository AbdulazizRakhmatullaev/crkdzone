import { supabase } from "@/lib/supaCli";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { tg_id, username, name } = await req.json();
        const dateTime = new Date().toISOString();

        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('tg_id', tg_id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error(fetchError.message);
        }

        let user = existingUser;

        if (!existingUser) {
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert([
                    {
                        tg_id,
                        name,
                        username,
                        balance: 0,
                        friends: 0,
                        authDate: dateTime,
                    },
                ])
                .select()
                .single();

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
