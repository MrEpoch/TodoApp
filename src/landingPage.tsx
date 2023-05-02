import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <section className="landing-page">
            <h1>Todo App</h1>
            <h2>Organize your life</h2>
            <h3>Sign Up</h3>
            <h3>Log In</h3>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
        </section>
    ) 
}
