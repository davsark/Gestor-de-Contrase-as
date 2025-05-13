"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Element } from "@/lib/generated/prisma";

import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal, User } from "lucide-react";
import { toast } from "sonner";


export type ColumProps = Element;


export const columns: ColumnDef<ColumProps>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "typeElement",
    header: "Tipo de elemento",
  },
  {
    accessorKey: "urlWebsite",
    header: "Url Del Sitio Web",
  },
  {
    accessorKey: "directory",
    header: "Directorio",
  },
  {
    accessorKey: "actions",
    header: ()=> <div className="text-center w-full">Acciones</div>,
    cell: ({ row }) => {
      const password = row.original.password;
      const username = row.original.username;
      
      const onEditElement = () => {
        window.location.href=`/element/${row.original.id}`
    };
    const copyItemClipboard = (item: string, name: string) => {
        navigator.clipboard.writeText(item);
        toast(`${name} copiada al portapapeles ✅`);
      }

      return(
        <div className="flex gap-4 justify-center items-center">
          {username && (
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => copyItemClipboard(username, "Usuario")}>
            <span className="text-sm text-muted-foreground">Copiar usuario/mail</span>
            <User className="w-4 h-4" />
          </div>
        )}
        {password && (
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => copyItemClipboard(password, "Contraseña")}>
            <span className="text-sm text-muted-foreground">Copiar contraseña</span>
            <Copy className="w-4 h-4" />
          </div>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={onEditElement}>Editar</DropdownMenuItem>
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      
      </div>
      )
    },
 },
];
