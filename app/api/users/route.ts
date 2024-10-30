import { connectToDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = await connectToDb();
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM users");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  } finally {
    client.release(); // Ensure the client is released back to the pool
  }
}

export async function POST(req: Request) {
  const pool = await connectToDb();
  const client = await pool.connect();

  try {
    const data = await req.json();
    const { username, balance } = data;

    const result = await client.query(
      "INSERT INTO users (username, balance) VALUES ($1, $2) RETURNING *",
      [username, balance],
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to insert user" },
      { status: 500 },
    );
  } finally {
    client.release(); // Ensure the client is released back to the pool
  }
}
