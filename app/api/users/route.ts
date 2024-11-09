import prisma from '@/lib/db';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    console.error("Detailed error:", err);
    return NextResponse.json({ message: "Error finding users", err }, { status: 500 })
  }
}