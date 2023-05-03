import "./authStyle.css";
import React from "react";

type ChildrenProp = {
    children: React.ReactNode
}

export default function AuthPage({ children } :ChildrenProp ) { 
    return (
        <section className="auth-page">
            {children}
            <div className="auth-page-block"></div>
            <div className="auth-page-block"></div>
        </section>
    )
}
