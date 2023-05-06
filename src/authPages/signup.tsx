import { Link, useNavigate } from "react-router-dom";
import AuthPage from "./authPage";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { StorageContextType, useStorage } from "../TodoComponents/tempLocalStorage";
import { mainFolderName } from "../TodoComponents/tempLocalStorage";

export default function SignUp() {
    
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { createLocalStorage } = useStorage() as StorageContextType;

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        setSubmitLoading(true);
        setError('')

        if (passwordRef.current && confirmPasswordRef.current) {
            if (passwordRef.current.value !== confirmPasswordRef.current.value) {
                setSubmitLoading(false);
                setError('Passwords do not match');
                return;
            } 
        }
        
        if (usernameRef.current) { 
            if (usernameRef.current.value.trim().length > 30) {
                setSubmitLoading(false);
                setError('Your username is bigger than 30 characters');
            }
        }

        try {
            createLocalStorage(mainFolderName, []);
            navigate("/todo")
        } catch (e) {
            setSubmitLoading(false)
            setError('Error signing up. Please try again');
            return;
        }

        setSubmitLoading(false);
    }

    return (

        <AuthPage>
            { submitLoading ? <div style={{ width: "100svw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center" }}><ClipLoader color="#DD2616" loading={submitLoading} size={150} /> </div> : 
            <section className="signup-card">
                {error && error}
                <h1>Sign Up</h1>
                <form className="account-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>username icon</title><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                        <input ref={usernameRef} className="input" type="text" placeholder="Username" />
                    </div>
                    <div className="input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>email</title><path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                        <input ref={emailRef} className="input"  type="text" placeholder="Email" />
                    </div>
                    <div className="input-container">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>key</title><path fill="currentColor" d="M7 14C5.9 14 5 13.1 5 12S5.9 10 7 10 9 10.9 9 12 8.1 14 7 14M12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12S3.7 18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z" /></svg>
                       <input ref={passwordRef} className="input"  type="password" placeholder="Password" />
                    </div>                   
                    <div className="input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>key</title><path fill="currentColor" d="M7 14C5.9 14 5 13.1 5 12S5.9 10 7 10 9 10.9 9 12 8.1 14 7 14M12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12S3.7 18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z" /></svg>
                        <input ref={confirmPasswordRef} className="input"  type="password" placeholder="Confirm Password" />
                    </div>                   

                    <button className="button" type="submit">Sign Up</button>
                </form>
                <h3>Already have an account? <Link to="/login">Log In</Link></h3>
            </section>
            }
        </AuthPage>
    )


}
