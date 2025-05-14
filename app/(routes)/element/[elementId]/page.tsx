import { FormEditElement } from "@/components/Shared/FormEditElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type PageProps = {
  params: {
    elementId: string;
  };
};

export default async function ElementPage({ params }: PageProps) {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const { elementId } = params;

  const element = await db.element.findUnique({
    where: {
      id: elementId,
    },
  });

  if (!element) {
    redirect("/");
  }

  return (
    <div>
      <h1>Element Page</h1>
      <div>
        <FormEditElement dataElement={element} />
      </div>
    </div>
  );
}
