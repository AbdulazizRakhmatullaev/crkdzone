import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { tg_id, username, avatar_url } = await req.json();
        const dateTime = new Date();

        let user = await prisma.user.findUnique({ where: { tg_id }, })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    tg_id,
                    username,
                    avatar_url,
                    balance: 0,
                    friends: 0,
                    authDate: dateTime,
                },
            });
        }

        return NextResponse.json(user);
    } catch (e) {
        return NextResponse.json({ message: "Unable to check or create user", e }, { status: 500 });
    }
}