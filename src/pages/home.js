import { useEffect,useState} from "react"
import ConcDetails from "../components/ConcDetails"
import ConcForm from "../components/ConcForm"

const Home=()=>{
        const [conc,setConc]=useState(null)
    // const {Concs,dispatch}=useConcsContext()
    // const {user}=useAuthContext()
    useEffect(()=>{
        const fetchConcs=async()=>{
            const response=await fetch('/Concession')
            const json=await response.json()

            if(response.ok){
                setConc(json)
                // dispatch({type:'SET_WORKOUTS',payload:json})
            }
        }
        fetchConcs()
    },[])
    return(
        <div className="home">
            <div id="workouts">
            {conc && conc.map((conc)=>(
                <ConcDetails key={conc._id} conc={conc} />
            ))}
            </div>
            <ConcForm/>
        </div>
    )
}
export default Home;