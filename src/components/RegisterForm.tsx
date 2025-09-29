import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RegisterContainer from "./RegisterContainer";
import { SexSelector } from "./SexSelector";

import axios from "axios";
import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import type { RegisterFormProps } from "@/types/RegisterFormProps";



export function RegisterForm(props: RegisterFormProps): JSX.Element {

    const [formData, setFormData] = useState({
        login: '',
        firstname: '',
        lastname: '',
        email: '',
        sex: '',
        role: 'USER',
        password: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSelect = (event: string) => {     
        setFormData({
            ...formData,
            sex: event
        });
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        console.log(formData);
        try {
            const res = await axios.post('http://localhost:3010/users/new', formData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RegisterContainer className="m-auto w-full max-w-sm">
            <Card className="w-full max-w-sm bg-[#01528f] text-[#f698c5] border-[#fbc5f2]">
                <CardHeader>
                    <CardTitle className="text-[#f698c5]">Создайте бесплатный аккаунт</CardTitle>
                    <CardDescription className="text-[#f698c5]">
                        Введите свои данные для создания аккаунта
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="login">Логин</Label>
                                <Input
                                    className="border-[#f698c5]"
                                    id="login"
                                    type="login"
                                    name="login"
                                    value={formData.login}
                                    onChange={handleChange}
                                    placeholder="Придумайте логин"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">Имя</Label>
                                <Input
                                    className="border-[#f698c5]"
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Введите свое имя"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">Фамилия</Label>
                                <Input
                                    className="border-[#f698c5]"
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Введите свою фамилию"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Почта</Label>
                                <Input
                                    className="border-[#f698c5]"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Укажите свою почту"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sex">Пол</Label>
                                <SexSelector handleSelect={handleSelect}/>                                
                            </div>                            
                            <div className="grid gap-2">
                                <Label htmlFor="password">Пароль</Label>
                                <Input
                                    className="border-[#f698c5]"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Придумайте пароль"
                                    required
                                />
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Button type="submit" variant={"barbie_pink"} className="w-full">
                                    Создать аккаунт
                                </Button>
                            </div>                          
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">                 
                    <Button onClick={props.goToHome} variant="outline" className="w-full text-black">
                        Вернуться
                    </Button>
                </CardFooter>
            </Card>
        </RegisterContainer>
    );
}