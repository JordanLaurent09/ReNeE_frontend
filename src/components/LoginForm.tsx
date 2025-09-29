import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import LoginContainer from "./LoginContainer"
import axios from "axios"
import { useState, type ChangeEvent, type FormEvent } from "react"
import type { JSX } from "react"
import type { LoginFormProps } from "@/types/LoginFormProps"

import Cookies from 'js-cookie';


export function LoginForm(props: LoginFormProps): JSX.Element {

  const [formData, setFormData] = useState({
    credential: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post('http://localhost:3010/auth/login', formData);
      console.log(res.data.id);
      if (res.data != '') {
        Cookies.set('Renee', res.data.accessToken);
        props.goToProfile(res.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

    
  return (
    <LoginContainer className="m-auto w-full max-w-sm">
        <Card className="w-full max-w-sm bg-[#5a346f] border-none">
      <CardHeader>
        <CardTitle className="text-left text-[#92e1df]">Зайти в аккаунт</CardTitle>
        <CardDescription className="text-left text-[#299bb3]">
          Введите свои данные для входа в аккаунт
        </CardDescription>
        <CardAction>
          <Button variant="link" className="text-[#92e1df]">Регистрация</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2 text-[#92e1df]">
              <Label htmlFor="credential">Почта/Логин</Label>
              <Input className="border-[#92e1df]"
                id="credential"
                type="text"
                name="credential"
                value={formData.credential}
                onChange={handleChange}
                placeholder="Введите почту/логин"
                required
              />
            </div>
            <div className="grid gap-2 text-[#92e1df]">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </a>
              </div>
              <Input className="border-[#92e1df]" id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" required />
            </div>
            <div className="mt-6 grid gap-2">
              <Button variant={'acid_cyan'} type="submit" className="w-full">
                Войти
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">        
        <Button onClick={props.goToHome} variant="jamaica_blue" className="w-full">
          Назад
        </Button>
      </CardFooter>
    </Card>
    </LoginContainer>
  )
}