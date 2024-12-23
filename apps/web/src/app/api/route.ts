import { NextResponse } from "next/server";
import prisma from "@bc-hey/db/prisma/client";

export async function GET() {
    return NextResponse.json({ message: "Hey API ✨" });
}
