import { useState } from "react";
import "../app.css";
import { Auth } from "../Components/Auth";

export function meta() {
  return [
    { title: "Książkarnia - Login" },
    { name: "description", content: "Strona logowania" },
  ];
}

export default function Login() {
  return (
    <div className="center">
      <h1 className="center">Zaloguj się</h1>
      <Auth />
    </div>
  );
}