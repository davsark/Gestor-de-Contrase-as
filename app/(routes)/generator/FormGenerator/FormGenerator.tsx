"use client";

import { Copy, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { copyClipboard } from "@/lib/copyClipboard";
import { PasswordGenerator } from "./PasswordGenerator";

export default function FormGenerator(){
    const [ itemValueInput, setItemValueInput] = useState("");
    const [selectedValue, setSelectedValue] = useState <("password" | "user" | "string")>("password");

    const [userTypeSelected, setUserTypeSelected] = useState ("username");

   const [lengthPassword, setLengthPassword] = useState(11);
   const [isMayusSelected, setIsMayusSelected] = useState(true);
   const [isMinusSelected, setIsMinusSelected] = useState(true);
   const [isNumbersSelected, setIsNumbersSelected] = useState(true);
   const [isSpecialCharacters, setIsSpecialCharacters] = useState(true);

    return (
        <div className="mt-5 max-w-2xl ">
            <div className="relative w-full">
                <Input 
                placeholder="input..."  
                value={itemValueInput} 
                onChange={() => {}}
                />
                <Copy className="absolute top-3 right-12 cursor-pointer h-5 w-5"
                onClick={() => copyClipboard(itemValueInput)}
                />
                <Shuffle className="absolute top-3 right-3 cursor-pointer h-5 w-5"/>
               
            </div>
            <div className="bg-slate-100 rounded-md shadow-md my-4 p-4">
                <p className="mb-4 text-slate-500 "> ¿Qué quieres generar?</p>
                <RadioGroup
                defaultValue="password"
                onValueChange={(value) => setSelectedValue(value as "password" | "user" | "string")}
                className="space-y-2"
                >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="password" id="r1" />
                    <Label htmlFor="r1">Contraseña</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="r2" />
                    <Label htmlFor="r2">Usuario</Label>
                </div>
                </RadioGroup>
            </div>
            {selectedValue === "password" ? (
               <PasswordGenerator 
                lengthPassword={lengthPassword}
                setLengthPassword={setLengthPassword}
                isMayusSelected={isMayusSelected}
                setIsMayusSelected={setIsMayusSelected}
                isMinusSelected={isMinusSelected}
                setIsMinusSelected={setIsMinusSelected}
                isNumberSelected={isNumbersSelected}
                setIsNumberSelected={setIsNumbersSelected}
                isSpecialCharacters={isSpecialCharacters}
                setIsSpecialCharacters={setIsSpecialCharacters}
               />
            ) : (
                <p>Form User</p>
            )}
        </div>
    )
}
