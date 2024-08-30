import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGISTER_USER } from "@/graphql/mutations/createUserMutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const createTagSchema = z
  .object({
    nome: z.string().min(3, { message: "No mínimo três caracteres" }),
    telefone: z.string().min(10, { message: "Número de telefone inválido" }),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Formato de e-mail inválido",
      }),
    password: z.string().min(6, { message: "Senha muito curta" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmação de senha muito curta" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type CreateTagSchema = z.infer<typeof createTagSchema>;

export function Register() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({
    nome: "",
    telefone: "",
  });
  const [step2Data, setStep2Data] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [createUserInput, { data, loading, error }] =
    useMutation(REGISTER_USER);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      nome: step1Data.nome,
      telefone: step1Data.telefone,
      email: step2Data.email,
      password: step2Data.password,
      confirmPassword: step2Data.confirmPassword,
    },
  });

  const onSubmit = async (dataForm: CreateTagSchema) => {
    await createUserInput({
      variables: {
        createUserInput: {
          nome: dataForm.nome,
          email: dataForm.email,
          password: dataForm.password,
          telefone: dataForm.telefone,
        },
      },
    });
    navigate("/signIn");
    console.log("response: ", data);
  };
  const handleStep1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStep1Data({
      ...step1Data,
      [e.target.name]: e.target.value,
    });
  };

  const handleStep2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStep2Data({
      ...step2Data,
      [e.target.name]: e.target.value,
    });
  };
  if (loading)
    return (
      <p className="bg-black dark:bg-stone-950 dark:text-stone-50 h-screen w-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-black dark:bg-stone-950 dark:text-stone-50 h-screen w-screen flex items-center justify-center">
      <Card className="bg-zinc-900 w-[522px] h-fit p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="w-[100%]">
            <CardTitle className="flex items-center justify-center w-[100%]">
              <img src="../../public/moonkey_ui/Moonkey.svg" alt="Logo" />
            </CardTitle>
          </CardHeader>
          <CardContent className="h-fit my-3">
            {step === 1 ? (
              <div className="w-[100%] h-[100%] flex flex-col justify-between">
                <label htmlFor="nome" className="font-semibold my-3">
                  Nome
                  <Input
                    {...register("nome")}
                    className="bg-zinc-800"
                    id="nome"
                    name="nome"
                    value={step1Data.nome}
                    onChange={handleStep1Change}
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nome.message}
                    </p>
                  )}
                </label>
                <label htmlFor="telefone" className="font-semibold my-3">
                  Telefone
                  <Input
                    {...register("telefone")}
                    className="bg-zinc-800"
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={step1Data.telefone}
                    onChange={handleStep1Change}
                  />
                  {errors.telefone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.telefone.message}
                    </p>
                  )}
                </label>
              </div>
            ) : (
              <div className="w-[100%] h-[100%] flex flex-col justify-between">
                <label htmlFor="email" className="font-semibold my-3">
                  E-mail
                  <Input
                    {...register("email")}
                    className="bg-zinc-800"
                    id="email"
                    name="email"
                    value={step2Data.email}
                    onChange={handleStep2Change}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </label>
                <label htmlFor="password" className="font-semibold my-3">
                  Senha
                  <Input
                    {...register("password")}
                    className="bg-zinc-800"
                    type="password"
                    id="password"
                    name="password"
                    value={step2Data.password}
                    onChange={handleStep2Change}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </label>
                <label htmlFor="confirmPassword" className="font-semibold my-3">
                  Confirmar senha
                  <Input
                    {...register("confirmPassword")}
                    className="bg-zinc-800"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={step2Data.confirmPassword}
                    onChange={handleStep2Change}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </label>
              </div>
            )}
          </CardContent>
          <CardFooter className="w-[100%] flex items-center justify-center">
            {step === 1 ? (
              <div className="w-[100%]">
                <span className="w-[100%] my-3">
                  Já possui conta?{" "}
                  <Link to={"/signin"}>
                    <span className="text-violetCustom font-bold">Entrar</span>
                  </Link>
                </span>
                <Button
                  onClick={nextStep}
                  type="button"
                  variant={"violet"}
                  className="w-[100%] my-3 font-semibold"
                >
                  Próximo {">"}
                </Button>
              </div>
            ) : (
              <div className="w-[100%] flex justify-between">
                <Button
                  onClick={prevStep}
                  type="button"
                  variant={"default"}
                  className="my-3 font-semibold"
                >
                  {"<"} Voltar
                </Button>
                <button
                  type="submit"
                  className="bg-[#B20DFF] text-white hover:bg-[#7F00BA] w-[60%] my-3 font-semibold"
                >
                  Criar Conta
                </button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
