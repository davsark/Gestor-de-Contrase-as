    import { Label } from "@radix-ui/react-label";
import { PasswordGeneratorProps } from "./PasswordGenerator.types";
import { Checkbox } from "@/components/ui/checkbox";
    
    
    export function PasswordGenerator(props: PasswordGeneratorProps){
        const {
            isMayusSelected, 
            isMinusSelected, 
            isNumberSelected, 
            isSpecialCharacters, 
            lengthPassword,
            setIsMayusSelected, 
            setIsMinusSelected, 
            setIsNumberSelected, 
            setIsSpecialCharacters,
            setLengthPassword,
            } = props;


const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLengthPassword(Number(event.target.value));
}
        return (  <div>
           <>
           <div className="w-full p-4 bg-slate-100 rounded-md shadow-md flex gap-2 items-center">
           <Label className="block text-sm font-medium text-gray-700 min-w-32">
            Longitud: {lengthPassword}
            </Label>
            <input type="range" id="range" min="8" max="50" className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
            value={lengthPassword}  onChange={handleRangeChange}
            />
           </div>
           <div>
            <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                <Checkbox id="mayus" checked={isMayusSelected} onCheckedChange={() => setIsMayusSelected((prev) => !prev)}
                />
                <Label htmlFor="mayus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Mayúsculas A-Z
                </Label>
                
            </div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox 
                    id="minus" 
                    checked={isMinusSelected} 
                    onCheckedChange={() => setIsMinusSelected((prev) => !prev)}
                    />
                    <Label 
                    htmlFor="minus" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Minusculas a-z
                    </Label>
                </div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox 
                    id="numbers" 
                    checked={isNumberSelected} 
                    onCheckedChange={() => setIsNumberSelected((prev) => !prev)}
                    />
                    <Label 
                    htmlFor="numbers" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Números 0-9
                    </Label>
                </div>
                <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
                    <Checkbox 
                    id="special" 
                    checked={isSpecialCharacters} 
                    onCheckedChange={() => setIsSpecialCharacters((prev) => !prev)}
                    />
                    <Label 
                    htmlFor="special" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> !#$%&()*+,-./:;?@[\]^_`~
                    </Label>
                </div>
           </div>
           </>
        </div>
    );
}
