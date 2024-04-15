import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {motion} from 'framer-motion'
const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [admin,setAdmin]=useState(false)
    const {login,error,isLoading}=useLogin()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(admin)
        await login(email,password,admin)
    }
    return(
        <motion.form className='login' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
        type='email'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
        <label>Password</label>
        <input
        type='password'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        />
        <p for="admin">Admin Login?</p>
        <input className="check"
        id="admin"
        type='checkbox'
        onChange={(e)=>{setAdmin(e.target.checked)
        }}
        />
       
        <motion.button disabled={isLoading} whileHover={{scale:1.1}}>Login</motion.button>
        {error && <div className='error'>{error}</div>}
    </motion.form>
    )
}
export default Login