import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm";

export function TabsForms() {
  return(
    <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrase</TabsTrigger>
        </TabsList>
                <TabsContent value="signin">
                    <Card>
                        <CardContent className="space-y-2"> 
                            <LoginForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                        <CardContent className="space-y-2"> 
                            <RegisterForm />
                        </CardContent>
                    </Card>
                </TabsContent>
    </Tabs>
  )
}
