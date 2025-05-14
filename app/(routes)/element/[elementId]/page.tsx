import { FormEditElement } from "@/components/Shared/FormEditElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// Definimos el tipo correctamente para las props
interface ElementPageProps {
  params: {
    elementId: string;
  };
}

export default async function ElementPage({ params }: ElementPageProps) {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const { elementId } = params;  // Aquí no necesitamos await

  const element = await db.element.findUnique({
    where: {
      id: elementId,
    },
  });

  if (!element) {
    return redirect("/"); // Necesitamos un return para hacer un redireccionamiento correcto
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
