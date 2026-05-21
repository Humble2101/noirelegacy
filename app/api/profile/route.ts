import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { password: _, ...safeUser } = user;
  return NextResponse.json(safeUser);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, bio, location, instagram, portfolioUrl, height, measurements, experienceLevel, categories } = body;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: { bio, location, instagram, portfolioUrl, height, measurements, experienceLevel, categories },
    create: { userId: session.user.id, bio, location, instagram, portfolioUrl, height, measurements, experienceLevel, categories },
  });

  return NextResponse.json({ message: "Profile updated.", profile });
}
