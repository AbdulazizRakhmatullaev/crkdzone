import prisma from '@/lib/prismaCli';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error finding users", err }, { status: 500 })
  }
}