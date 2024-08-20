import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Register () {
    const [step, setStep] = useState(1)

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

return (
    <div className="bg-black dark:bg-stone-950 dark:text-stone-50 h-screen w-screen flex items-center justify-center">
        <Card className="bg-zinc-900 w-[522px] h-fit p-6">
            <form action="">
                <CardHeader className="w-[100%]">
                <CardTitle className="flex items-center justify-center w-[100%]">
                <img src="../../public/moonkey_ui/Moonkey.svg" />
                </CardTitle>
                </CardHeader>
                <CardContent className="h-fit my-3">
                    {
                        step === 1 ? (
                        <div className="w-[100%] h-[100%] flex flex-col justify-between">
                            <label htmlFor="email" className="font-semibold my-3">
                                Nome
                                <Input className="bg-zinc-800 " id="email" />
                            </label>
                            <label htmlFor="email" className="font-semibold my-3">
                                Telefone
                                <Input className="bg-zinc-800" type="tel" id="email" />
                            </label>
                        </div>
                        ):(
                        <div className="w-[100%] h-[100%] flex flex-col justify-between">
                            <label htmlFor="email" className="font-semibold my-3">
                                E-mail
                                <Input className="bg-zinc-800 " id="email" />
                            </label>
                            <label htmlFor="email" className="font-semibold my-3">
                                Senha
                                <Input className="bg-zinc-800" type="tel" id="email" />
                            </label>
                            <label htmlFor="email" className="font-semibold my-3">
                                Confirmar senha
                                <Input className="bg-zinc-800" type="tel" id="email" />
                            </label>
                        </div> 
                        )
                    }
                </CardContent>
                <CardFooter className="w-[100%] flex items-center justify-center">
                    {
                        step === 1 ? (
                            <div className="w-[100%] ">
                            <span className="w-[100%] my-3">Já possui conta? <Link to={'/signin'}><span className="text-violetCustom font-bold">Entrar</span></Link></span>
                                <Button onClick={nextStep} type="button" variant={"violet"} className="w-[100%] my-3 font-semibold">
                                    Proximo {'>'}
                                </Button>
                            </div>
                        ) :(
                            <div className="w-[100%] flex justify-between">
                                <Button onClick={prevStep} type="button" variant={"default"} className=" my-3 font-semibold">
                                {'<'} Voltar 
                                </Button>
                                <Button type="button" variant={"violet"} className="w-[60%] my-3 font-semibold">
                                    Criar Conta
                                </Button>
                            </div>
                        )
                    }
                </CardFooter>
            </form>
        </Card>
    </div>
);
}