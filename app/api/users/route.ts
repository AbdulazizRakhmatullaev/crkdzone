import prisma from '@/lib/db';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "Error getting users", err }, { status: 500 })
  }
}