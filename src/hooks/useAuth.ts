import { useState } from "react";


export const useAuth = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    const login = async (email: string, password: string) => {

    }

    const logout = async () => {

    }

    const register = async (name: string, email: string, password: string) => {

    }
    

    return {
        login,
        logout,
        register,
        isLoading
    }
}
