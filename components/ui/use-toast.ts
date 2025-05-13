// /components/ui/use-toast.ts
import * as Toast from '@radix-ui/react-toast';
import React from 'react';

type ToastType = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

let toastFn: (params: ToastType) => void;

// Creamos una función para mostrar el toast
const useToast = () => {
  const [_, startTransition] = React.useTransition();

  React.useEffect(() => {
    // Esto se ejecuta en el cliente
    toastFn = (params) => {
      startTransition(() => {
        // Usamos dispatchEvent para enviar un evento personalizado
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: params,
          })
        );
      });
    };
  }, []);

  return {
    toast: toastFn,
  };
};

export { useToast };