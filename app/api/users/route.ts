import prisma from '@/lib/prismaCli';
import { NextResponse } from "next/server";

// PRISMA
export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (err) {
    console.error("Faild to fetch users", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    )
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  const { tg_id, username } = await req.json();
  const dateTime = new Date();

  try {
    await prisma.user.create({
      data: {
        tg_id,
        username,
        authDate: dateTime,
        balance: 0,
        friends: 0
      }
    })

    return NextResponse.json({ message: "Succesfully created a new user!", status: 201 });
  } catch (err) {
    console.log("Failed to create a new user", err);
    return NextResponse.json(
      { error: "Failed to create a user" },
      { status: 500 },
    );
  } finally { 
    prisma.$disconnect();
  }
}
