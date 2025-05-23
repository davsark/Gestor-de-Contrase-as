"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Earth, Eye, Shuffle } from "lucide-react"
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
import { formSchema } from "./FormAddElement.form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy } from "lucide-react"
import { copyClipboard } from "@/lib/copyClipboard"
import { useState } from "react"
import { generatePassword } from "@/lib/generatePassword"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/db"
import {useToast} from "@/components/ui/use-toast"
import { toast } from "sonner"
import axios from "axios"
import {useRouter} from "next/navigation"
import { FormAddElementProps } from "./FormAddElemet.types";




export  function FormAddElement(props: FormAddElementProps) {
    const {userId , closeDialog} = props;
    const [ showPassword, setShowPassword] = useState(false)
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema) as any,
      defaultValues: {
        typeElement: "",
        isFavourite: false,
        name: "",
        directory: "",
        username: "",
        password: "",
        urlWebsite: "",
        notes: "",
        userId: userId,
      },
    })

   
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post("/api/items", values)
        toast({title: "Elemento creado correctamente"})
        form.reset({
            typeElement: "",
            isFavourite: false,
            name: "",
            directory: "",
            username: "",
            password: "",
            urlWebsite: "",
            notes: "",
        });
        closeDialog();
       router.refresh();
        
      }catch (error){
        toast({
          title: "Algo ha fallado",
          variant: "destructive",
        })
      }
    };
    
    const generateRandomPassword = () => {
      const password = generatePassword()
      console.log(password);
      form.setValue("password", password)
    }
    const updateUrl =() => {
      form.setValue("urlWebsite", window.location.href)
    }
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 gap-y-2 gap-x-4 grid">
        {/* tipo de elemento */}
        <FormField
          control={form.control}
          name="typeElement"
          render={({ field }) => (
            <FormItem>
            <FormLabel>¿Qué tipo de elemento necesitas?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}
            >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un directorio para tu contraseña" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Inicio de sesión">Inicio de sesión</SelectItem>
              <SelectItem value="Tarjeta">Tarjeta</SelectItem>
              <SelectItem value="Identidad">Identidad</SelectItem>
            </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* favorito */}
        <FormField
          control={form.control}
          name="isFavourite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Quieres seleccionar tu contraseña como favorita?
              </FormLabel>
              <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                </FormControl>
                <div>
                  <FormLabel className="space-y-1 leading-none">
                    Marcar como favorito
                  </FormLabel>
                </div>
              </div>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {/* nombre */}
         <FormField
        control={form.control}
        name="name"
        render={({field}) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        {/* directorio */}
        <FormField
          control={form.control}
          name="directory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Directorio</FormLabel>
              <Select onValueChange={field.onChange} 
              defaultValue={field.value}
              >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Elige el directorio" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* usuario */}
         <FormField
        control={form.control}
        name="username"
        render={({field}) => (
          <FormItem>
            <FormLabel>Usuario o Correo Electrónico</FormLabel>
            <FormControl>
              <div className="relative">
              <Input {...field} />
              <Copy 
              className="absolute top-3 right-4 cursor-pointer" 
              size={18} 
              onClick={() =>{
                copyClipboard(field.value)
              }}
              />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        {/* url del sitio web */}
         <FormField
        control={form.control}
        name="urlWebsite"
        render={({field}) => (
          <FormItem>
            <FormLabel>Url del sitio web</FormLabel>
            <FormControl>
              <div className="relative">

              <Input {...field} />
              <Earth 
              className="absolute top-3 right-2 cursor-pointer" 
              size={18}
              onClick={updateUrl} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        {/* contraseña */}
        <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex justify-between">
              Contraseña
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs text-black"
                >
                  Generar contraseña aleatoria
                </span>
                <Shuffle className="cursor-pointer" size={15} onClick={generateRandomPassword}/>
              </div>
            </FormLabel>
            <FormControl>
              <div className="relative">

              <Input {...field} type={showPassword ? "text" : "password"} 
              />
              <Eye 
              className="absolute top-3 right-10 cursor-pointer" 
              size={18}
              onClick={() => setShowPassword(!showPassword)} />
              <Copy 
              className="absolute top-3 right-2 cursor-pointer" 
              size={18}
              onClick={() =>{
                copyClipboard(field.value)
              }}
              />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <div>
        <div className="text-slate-400 flex items-center justify-between text-sm"> 
          Autenticación de dos factores
          <p className="px-3 bg-green-500 text-white rounded-lg text-xs mr-5">
            Premium</p>
          </div>
          <Input disabled className="bg-slate-100" />
          </div>
          {/* notas */}
          <FormField
            control={form.control}
            name="notes"
            render={({field}) => (
              <FormItem>
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              <FormMessage />
              </FormItem>       
          )}
        />
        <div />
        <Button className="bg-purple-500 text-white" type="submit">Guardar</Button>
      </form>
    </Form>
    </div>
  )
}
