"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {useToast} from "@/components/ui/use-toast"
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
import { useRouter } from "next/navigation"
 const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    username: z.string().min(2).max(50),
 })


export  function RegisterForm() {
     const router = useRouter();
     const {toast} = useToast(); 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",

    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        username: values.username,
      }),
    });
    if (response.status === 200) {
      router.push("/");
      toast({
        title: "Registro se ha realizado con éxito"
      })
    }else{
        toast({
            title: "Error al realizar el registro",
            variant: "destructive",
        })
    }
    const data = await response.json();
    console.log(data);
  };
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 space-y-3 text-black">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="correo@example.com" {...field} />
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
                    <Input placeholder="Deadpool" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="Shhh..." type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button className="w-full bg-purple-500" type="submit">Registrar</Button>
          </form>
        </Form>
      )
  
}
