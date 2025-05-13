import { SetStateAction } from "react";

import { Dispatch } from "react";


export type PasswordGeneratorProps = {
    lengthPassword: number;
    setLengthPassword: Dispatch<SetStateAction<number>>;
  
    isMayusSelected: boolean;
    setIsMayusSelected: Dispatch<SetStateAction<boolean>>;
  
    isMinusSelected: boolean;
    setIsMinusSelected: Dispatch<SetStateAction<boolean>>;
  
    isNumberSelected: boolean;
    setIsNumberSelected: Dispatch<SetStateAction<boolean>>;
  
    isSpecialCharacters: boolean;
    setIsSpecialCharacters: Dispatch<SetStateAction<boolean>>;
  };
