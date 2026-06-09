import { useState } from "react"
import { useAuth } from "../context/authContext"
import { StyledInput } from "../components/StyledInput"

export const Login = () => {
    const [password, setPassword] = useState('')
    const { login } = useAuth()

    const handleLogin = () => {
        const success = login(password);
        if (success) {
            console.log('logged in')
        } else {
            setPassword('')
        }
    }
    return (
        <main className="flex flex-col h-screen justify-center gap-8 mx-2">
            <h1 className="text-center font-bold text-2xl">grapple-log</h1>

            <div className="flex flex-col border p-8">
                <StyledInput
                    state={[password, setPassword]}
                    type="password"
                    label="PW"
                    validator={pw => pw.length > 5}
                    onEnter={handleLogin}
                />
                <button
                    className="text-xl self-end"
                    onClick={handleLogin}
                >log in &#8614;</button>
            </div>
        </main>

    )
}

