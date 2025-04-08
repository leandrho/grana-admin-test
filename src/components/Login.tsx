import { useState } from "react"
import { apiRequest } from "../services/api";

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorLogin, setErrorLogin] = useState<string>('');

    const tryLogin = async(email: string, password: string) => {
        try {
            const url: string = `${import.meta.env.VITE_API_URL}/auth/login`
            const ops = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
            const res = await apiRequest(url, ops);
            console.log(res);
        }
        catch(error){
                setErrorLogin(`${error} - Intente nuevamente.`);
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setErrorEmail('');
        setErrorPassword('');
        setErrorLogin('');
        
        if(!isValidEmail(email)){
            setErrorEmail('Email invalido');
            return;
        }
        
        if(password.length < 8){
            setErrorPassword('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        await tryLogin(email, password);
        setPassword('');
        setEmail('');
    }


  return (
    <form  className="w-full max-w-xl p-6 bg-white rounded-2xl" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="text-lg font-bold text-amber-800 ">Email:</label>
            <input  type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email" 
                    name="email" 
                    className="bg-amber-100 rounded-lg text-lg px-3 py-2 focus:outline-2 focus:outline-amber-300"
            />
            {errorEmail && <p className={'text-red-400 text-sm'} >{errorEmail}</p>}
        </div>
        <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="password" className="text-lg font-bold text-amber-800 ">Contraseña:</label>
            <input 
                    type="text" 
                    id="password" 
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="bg-amber-100 rounded-lg text-lg px-3 py-2 focus:outline-2 focus:outline-amber-300"
            />
            {errorPassword && <p className={'text-red-400 text-sm'} >{errorPassword}</p>}
        </div>
        <div className="flex justify-end ">
            <button type="submit" className="text-amber-800 max-w-36 grow bg-amber-400 rounded-lg text-base font-bold p-3 cursor-pointer hover:bg-amber-500">Ingresar</button>
        </div>
        {errorLogin && <p className={'text-red-400 text-base font-bold'} >{errorLogin}</p>}
    </form>
  )
}
