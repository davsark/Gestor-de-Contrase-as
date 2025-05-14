"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react" ;
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";


export  function SidebarMobile() {
  return (
    <Sheet>
  <SheetTrigger className="bg-purple-500 text-white" asChild>
    <button>
        <Menu/>
    </button>
  </SheetTrigger>
  <SheetContent side="left" className="bg-purple-500 text-white">
    <SheetHeader className="text-left mb-4">
      <SheetTitle className="text-white">Gestor Contraseñas</SheetTitle>
      <SheetDescription className="text-slate-100">
        Crea y gestiona todas tus contraseñas
      </SheetDescription>
    </SheetHeader>
    <SidebarRoutes/>
  </SheetContent>
</Sheet>

  )
}
