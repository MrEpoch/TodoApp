import "./authStyle.css";
import { ChildrenProp } from "../@types/todo";

export default function AuthPage({ children }: ChildrenProp) {
  return (
    <section className="auth-page">
      {children}
      <div className="auth-page-block"></div>
      <div className="auth-page-block"></div>
    </section>
  );
}
