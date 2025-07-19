import { useState } from "react";

const Register = () => {

    const [name, setName]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={e => {
            e.preventDefault()

        }}>
            <label htmlFor="name">Nombre y Apellido:</label>
            <br />
            <input type="text" 
            name="fullname"
            placeholder="example: Rogelis Garcia"
            value={name}
            onChange = {e => setName(e.target.value)}/>
            <br />
            <label htmlFor="email">Correo Electronico:</label>
            <br />
            <input type="email" 
            name="email" 
            placeholder="example@gmail.com" 
            autoComplete="off"
            value={email}
            onChange={e=> setEmail(e.target.value)} />
            <br />
            <label htmlFor="password">Contraseña:</label>
            <br />
            <input type="password" 
            name="password"
            placeholder="*****"
            value={password}
            onChange={e => setPassword(e.target.value)} />
            <br />
            <button type="submit">Registrarme</button>
            <br />
            <button><a href="/login">Ya estoy registrad@</a></button>
        </form> 
    );
};

export default Register;
