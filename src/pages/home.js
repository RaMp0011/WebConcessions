import { useEffect} from "react"
import ConcDetails from "../components/ConcDetails"
import ConcForm from "../components/ConcForm"
import { useConcsContext } from "../hooks/useConcContext"
import { useAuthContext } from "../hooks/useAuthContext"
import {motion} from 'framer-motion'

const Home=()=>{
    const {conc,dispatch}=useConcsContext()
    const {user}=useAuthContext()
    const {admin}=useAuthContext()
    useEffect(()=>{
        
        const fetchConcs=async()=>{
            if(!admin){
            const response=await fetch('/Concession',{
                headers:{'Authorization':`Bearer ${user.token}`}
            })
            const json=await response.json()

            if(response.ok){
                // setConc(json)
                dispatch({type:'SET_CONCS',payload:json})
            }}
            else{
                const response=await fetch('/Concession/admin',{
                    headers:{'Authorization':`Bearer ${admin.token}`}
                })
                const json=await response.json()
    
                if(response.ok){
                    // setConc(json)
                    dispatch({type:'SET_CONCS',payload:json})
                }
            }
            
        }
        if(admin||user){
        fetchConcs()
        }
    },[dispatch,user,admin])
    return(
        <motion.div className="home"
        >
            {admin ? <h1>Admin control</h1>:false}
            <div id="workouts">
            {conc && conc.map((conc)=>(
                <ConcDetails key={conc._id} conc={conc} />
            ))}
            </div>
                {!admin ?<ConcForm/> :"" }  
        </motion.div>
    )
}
export default Home;