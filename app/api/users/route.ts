import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany()

        return NextResponse.json(users);
    } catch (e) {
        return NextResponse.json({ message: "Unable to retrieve users data", e }, { status: 500 })
    }
}