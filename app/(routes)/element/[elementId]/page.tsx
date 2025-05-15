import { FormEditElement } from "@/components/Shared/FormEditElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function ElementPage({params}: {
    params: {elementId: string};
}){
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return redirect("/")
  }
  const { elementId } =  params; // ✅ Aquí se hace await a params

  const element = await db.element.findUnique({
    where: {
      id: elementId, // ✅ Ahora usamos elementId directamente
    },
  });
  if (!element) {
    redirect("/")
  }
    return (
        <div>
            <h1>Element Page</h1>
            <div>
           <FormEditElement dataElement={element}/>
            </div>
        </div>
    )
}
