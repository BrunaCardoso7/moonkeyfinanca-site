// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "@/graphql/mutations/userLoginMutation";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const loginTagSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Formato de e-mail inválido",
    }),
  password: z.string().min(6, { message: "Senha muito curta" }),
});

type LoginTagSchema = z.infer<typeof loginTagSchema>;
export function Login() {
  const [createAuthInput, { data, loading, error }] = useMutation(LOGIN_USER);

  const { register, handleSubmit } = useForm<LoginTagSchema>({
    resolver: zodResolver(loginTagSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (dataForm: LoginTagSchema) => {
    console.log(dataForm);
    const response = await createAuthInput({
      variables: {
        createAuthInput: {
          email: dataForm.email,
          password: dataForm.password,
        },
      },
    });
    if (response.data) {
      const accessToken = response.data.loginUser.acess_Token;
      Cookies.set("access_token", accessToken);
    }
    navigate("/");
  };
  console.log(data);

  if (loading)
    return (
      <p className="bg-black dark:bg-stone-950 dark:text-stone-50 h-screen w-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="bg-black dark:bg-stone-950 dark:text-stone-50 h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <Input className="bg-zinc-800 " {...register("email")} />
              </label>
              <label htmlFor="password" className="font-semibold my-3">
                Senha
                <Input
                  className="bg-zinc-800 "
                  id="password"
                  {...register("password")}
                />
              </label>
            </div>
          </CardContent>
          <CardFooter className="w-[100%] flex items-center justify-center">
            <div className="w-[100%] ">
              <span className="w-[100%] my-3">
                Não possui conta?{" "}
                <Link to={"/signup"}>
                  <span className="text-violetCustom font-bold">
                    Registre-se
                  </span>
                </Link>
              </span>
              <button type="submit" className="w-[100%] my-3 font-semibold">
                Entrar
              </button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
