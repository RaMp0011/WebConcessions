import { useState } from "react";

export default function ConcForm(){
    const [from,setFrom]=useState('')
    const [via,setVia]=useState('')
    const [error,setError]=useState(null)
    const[emptyFields,setEmptyFields]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const conc={from,via}

        const response=await fetch('/Concession',{
            method:'POST',
            body:JSON.stringify(conc),
            headers:{'Content-Type':'application/json'}
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
            // dispatch({type:'CREATE_WORKOUT',payload:json})
        }

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
        <h3>Apply for Concession</h3>

        <label>From:</label>
        <input
        type='text'
        onChange={(e)=>setFrom(e.target.value)}
        value={from}
        className={emptyFields.includes('form')?'error':''}
        />
        <label>To:</label>
        <input id="default" type="text" value="Govandi" disabled="disabled"></input>
        <label>via:</label>
        <input
        type='text'
        onChange={(e)=>setVia(e.target.value)}
        value={via}
        className={emptyFields.includes('via')?'error':''}
        />
        <button>Apply</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}