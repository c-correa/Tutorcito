import { Value } from "@radix-ui/react-select";
import React,{useState} from "react";

const app = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    return (
    <form onSubmit={e => {
        e.preventDefault();
        login(email, password)
    }}>
        <label htmlFor="login">Ingrese correo:</label>
        <br />
        <input type="text"
         name="email" 
         placeholder="Email" 
         autoComplete="off"
         value={email}
         onChange={e => setEmail(e.target.value)}
         />

        <br />
        <label htmlFor="password" >Ingrese contraseña:</label>
        <br /> 
        <input type="password"
        name="password"
        placeholder="Contraseña" 
        value={password}
        onChange={e => setPassword(e.target.value)}/>
        <br />
        <button type="submit">Iniciar sesión</button>
    </form>
    );
};

const login = (email, password) => {
    if(email === "example@gmail.com" && password === "1234"){
alert("login exitoso") 
    } else if (!email || !password) {
    alert("Complete todos los requisitos")
    }
    else {
    alert("login incorrecto")
    }
}


export default app;

