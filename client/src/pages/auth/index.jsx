import Background from "@/assets/login2.png"
import Victory from "@/assets/victory.svg"
import { Tabs, TabsList } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {

    const navigate = useNavigate();
    const { setUserInfo } = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateLogin = () => {
        if (!email.length) {
            toast.error("El correo es requerido.");
            return false;
        }
        if (!password.length) {
            toast.error("Contraseña requerida.");
            return false;
        }
        return true;
    };

    const validateSignup = () => {
        if (!email.length) {
            toast.error("El correo es requerido.");
            return false;
        }
        if (!password.length) {
            toast.error("Contraseña requerida.");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (validateLogin()) {
            const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials:true });
            if (response.data.user.id) {
                setUserInfo(response.data.user);
                if (response.data.user.profileSetup) navigate("/chat");
                else navigate("/profile");
            }
            console.log({ response });
        }
    };

    const handleSignup = async () => {
        if (validateSignup()) {
            const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials:true });
            if (response.status === 201) {
                setUserInfo(response.data.user);
                navigate("/profile");
            }
            console.log({ response });
        }
    };


    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-black">
            <div className="h-[80vh] bg-black border-2 border-black text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex flex-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl text-white">Bienvenido</h1>
                            <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
                        
                        </div>
                        <p className="font-medium text-center text-white">
                        Complete los detalles para comenzar con la mejor aplicación de chat
                        </p>
                    </div>
                    <div className="flex item-center justify-center w-full">
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger value="login"
                                className="data-[state=active]:bg-transparent text-white text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                                >Acceso
                                </TabsTrigger>
                                <TabsTrigger value="signup"
                                className="data-[state=active]:bg-transparent text-white text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                                >Regístrate
                                </TabsTrigger>
                            </TabsList>
                                <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                                    <Input 
                                        placeholder="Correo"
                                        type="email"
                                        className="rounded-full p-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input 
                                        placeholder="Contraseña"
                                        type="password"
                                        className="rounded-full p-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button className="rounded-full p-6 bg-purple-400 text-black hover:bg-purple-900 hover:text-gray-900 transition-colors" onClick={handleLogin}>
                                        Acceder
                                    </Button>
                                </TabsContent>
                                <TabsContent className="flex flex-col gap-5 mt-5" value="signup">
                                    <Input 
                                        placeholder="Correo"
                                        type="email"
                                        className="rounded-full p-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input 
                                        placeholder="Contraseña"
                                        type="password"
                                        className="rounded-full p-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Input 
                                        placeholder="Confirmar Contraseña"
                                        type="password"
                                        className="rounded-full p-6"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />  
                                    <Button className="rounded-full p-6 bg-purple-400 text-black hover:bg-purple-900 hover:text-gray-900 transition-colors" onClick={handleSignup}>
                                        Registrarse
                                    </Button>                               
                                </TabsContent> 
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex justify-center items-center">
                    <img src={Background} alt="background login" className="h-[700px]" />
                </div>
            </div>
        </div>
    );
};

export default Auth;