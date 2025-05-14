

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FormProfileProps } from "./FormProfile.types";
import { formSchema } from "./FormProfile.form"
import { useState } from "react"
import { UploadButton } from "@/lib/uploadThing"
import { Upload } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export function FormProfile(props: FormProfileProps) {
    const {user} = props;
    const router = useRouter();
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [PhotoUploaded, setPhotoUploaded] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: user.name || "" ,
          email: user.email || "text@example.com",
          profileImage: user.profileImage || "",
          username: user.username || "",
          id: user.id,
        },
      })
     
     const  onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
           await axios.patch("/api/profile", values)
           toast("Perfil actualizado correctamente")
           router.refresh()
           setShowUploadPhoto(false)
           setPhotoUploaded(false)

        }catch(error){
            console.log(error)
            toast("Error al actualizar el perfil")
        }
      }


      return (
        <div className="max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen de perfil</FormLabel>
                  <FormControl>
                    <div>
                        <div className="flex gap-2 items-center">
                            <Image 
                            src={
                                user.profileImage 
                                ? user.profileImage 
                                : "/images/default-profile.jpg"
                            } 
                            alt="Image profile" 
                            width={60} 
                            height={60} 
                            className="rounded-full"
                            />
                            <div className="w-[200px]">
                            {showUploadPhoto ?(
                                <UploadButton
                                className="rounded-md text-white bg-purple-500 mt-3"
                                {...field}
                                endpoint="profileImage"
                                onClientUploadComplete={(res) => {
                                    form.setValue("profileImage", res?.[0].url)
                                    setPhotoUploaded(true)
                                }}
                                onUploadError={(error: Error) => {
                                    console.log(error)
                                }}
                                />
                            ) : (
                                <Button 
                                className="rounded-md text-white bg-purple-500 mt-3"
                                onClick={() => setShowUploadPhoto((prev) => !prev)}
                                >
                                    <Upload className="mr-2 w-4 h-4" /> Cambiar imagen
                                </Button>
                            )}
                            </div>
                        </div>
                        {PhotoUploaded && (
                            <p className="text-sm text-green-500">Imagen Subida</p>
                        )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="DeadPool" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="@DeadPool" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full bg-purple-500" type="submit">Guardar cambios</Button>
          </form>
        </Form>
        </div>
      )
}
