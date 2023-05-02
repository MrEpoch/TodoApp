import "./authStyle.css";

export default function AuthPage({ children } : any ) { 
    return (
        <section className="auth-page">
            {children}
            <div className="auth-page-block"></div>
            <div className="auth-page-block"></div>
        </section>
    )
}
