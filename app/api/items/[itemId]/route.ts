import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const values = await req.json();

    if (!itemId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const element = await db.element.update({
      where: {
        id: itemId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(element);
  } catch (error) {
    console.error("Error updating element:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}