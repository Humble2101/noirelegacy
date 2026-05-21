import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    include: { profile: true },
    orderBy: { createdAt: "desc" },
  });

  const safe = users.map(({ password: _, ...u }) => u);
  return NextResponse.json(safe);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, role } = await request.json();

  if (userId === session.user.id) {
    return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
  }

  if (role !== "USER" && role !== "ADMIN") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return NextResponse.json({ message: "Role updated", user });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId || userId === session.user.id) {
    return NextResponse.json({ error: "Cannot delete this user" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json({ message: "User deleted" });
}
