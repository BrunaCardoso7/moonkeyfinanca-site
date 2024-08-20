import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function Login () {
    return (
      <div className="bg-black dark:bg-stone-950 dark:text-stone-50 h-screen w-screen flex items-center justify-center">
        <Card className="bg-zinc-900 w-[522px] h-fit p-6">
          <CardHeader className="w-[100%]">
            <CardTitle className="flex items-center justify-center w-[100%]">
              <img src="../../public/moonkey_ui/Moonkey.svg" />
            </CardTitle>
          </CardHeader>
          <CardContent className="h-52 my-3">
            <div className="w-[100%] h-[100%] flex flex-col justify-between">
                <label htmlFor="email" className="font-semibold my-3">
                  E-mail
                  <Input className="bg-zinc-800 " id="email" />
                </label>
                <label htmlFor="email" className="font-semibold my-3">
                  Senha
                  <Input className="bg-zinc-800 " id="email" />
                </label>
            </div>
          </CardContent>
          <CardFooter className="w-[100%] flex items-center justify-center">
            <div className="w-[100%] ">
                <span className="w-[100%] my-3">Não possui conta? <Link to={'/signup'}><span className="text-violetCustom font-bold">Registre-se</span></Link></span>
                <Button variant={"violet"} className="w-[100%] my-3 font-semibold">
                  Entrar
                </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }