import prisma from '@/lib/prismaCli';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tgId, userN } = await req.json();
    const dateTime = new Date();

    let user = await prisma.user.findUnique({ where: { tg_id: tgId } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          tg_id: tgId,
          username: userN,
          balance: 0,
          friends: 0,
          authDate: dateTime,
        },
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error checking or creating user", err }, { status: 500 })
  }
}