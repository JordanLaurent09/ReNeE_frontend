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
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create free account</CardTitle>
                    <CardDescription>
                        Enter your data to complete creation of account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="login">Login</Label>
                                <Input
                                    id="login"
                                    type="login"
                                    name="login"
                                    value={formData.login}
                                    onChange={handleChange}
                                    placeholder="Enter your login"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">Last name</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Enter your surname"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your e-mail"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sex">Gender</Label>
                                <SexSelector handleSelect={handleSelect}/>                                
                            </div>                            
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>                          
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">                 
                    <Button onClick={props.goToHome} variant="outline" className="w-full">
                        Back to Home
                    </Button>
                </CardFooter>
            </Card>
        </RegisterContainer>
    );
}