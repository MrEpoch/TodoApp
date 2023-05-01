import { Link, redirect } from "react-router-dom";
import AuthPage from "./authPage";
import { useState } from "react";

export default function Login() {
    
    const [error, setError] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            console.log('hello')
            redirect('/dashboard');
        } catch (e) {
            setError('Error Logging In. Please try again');
        }

        setError('');
    }

    return (
        <AuthPage>
            <section className="login-card">
                {error && error}
                <h1>Log In</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign Up</button>
                </form>
                <h3>Need account? <Link to="/dashboard">Sign Up</Link></h3>
            </section>
        </AuthPage>
    )


}
