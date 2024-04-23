import { useState } from "react";
import {useConcsContext } from "../hooks/useConcContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {motion} from 'framer-motion'

export default function ConcForm(){
    const {dispatch}=useConcsContext()
    const [from,setFrom]=useState('')
    const [via,setVia]=useState('')
    const [clas,setClass]=useState('')
    const [period,setPeriod]=useState('')
    const [error,setError]=useState(null)
    const[emptyFields,setEmptyFields]=useState([])
    const {user}=useAuthContext()

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const conc={from,via,clas,period}
        if(!user){
            setError('You must be logged in')
            return
        }
        const forms=await fetch('/Concession',{
            headers:{'Authorization':`Bearer ${user.token}`}
        })
        const jsonn=await forms.json()
        if(jsonn.length>0){
            setError('You have already applied')
            return
        }
        const season=await fetch('/ir',{
            headers:{'Authorization':`Bearer ${user.token}`}
        })
        const dataS=await season.json()
        if(dataS.length>0){
            setError('You have on going active IR season pass please try sometime later')
            return
        }

        const response=await fetch('/Concession',{
            method:'POST',
            body:JSON.stringify(conc),
            headers:{'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
        }
        })
        const json=await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setFrom('')
            setVia('')
            setError(null)
            setEmptyFields([])
            console.log('Concession has been applied')
            dispatch({type:'CREATE_CONCS',payload:json})
        }

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
        <h2>Apply for Concession</h2>
        <label className="lay">From:</label>
        <input
        type='text'
        onChange={(e)=>setFrom(e.target.value)}
        value={from}
        className={emptyFields.includes('form')?'error':''}
        />
        <label className="lay">To:</label>
        <input id="default" type="text" value="Govandi" disabled="disabled"></input>
        <label className="lay">via:</label>
        <input
        type='text'
        onChange={(e)=>setVia(e.target.value)}
        value={via}
        className={emptyFields.includes('via')?'error':''}
        />
        {/* <label for="clas">Class:</label>
  <select id="clas" name="class">
    <option value="First">Second</option>
    <option value="Second">First</option>
  </select> */}
  <legend>Class:</legend>
    <div class="radioo">
      <input type="radio" id="contactChoice1" name="class" value="Second" onChange={(e)=>setClass(e.target.value) } className={emptyFields.includes('class')?'error':''}/>
      <label for="contactChoice1">Second</label>

      <input type="radio" id="contactChoice2" name="class" value="First" onChange={(e)=>setClass(e.target.value)} className={emptyFields.includes('class')?'error':''}/>
      <label for="contactChoice2">First</label>
    </div>
    <legend>Period:</legend>
    <div class="radioo">
      <input type="radio" id="contactChoic1" name="period" value="Monthly" onChange={(e)=>setPeriod(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="contactChoic1">Monthly</label>

      <input type="radio" id="contactChoic2" name="period" value="Quarterly" onChange={(e)=>setPeriod(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="contactChoic2">Quarterly</label>
    </div>
        <motion.button whileHover={{scale:1.1}}>Apply</motion.button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}