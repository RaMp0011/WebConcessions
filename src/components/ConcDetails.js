import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ConcDetails({conc}){
    // const {dispatch}=useWorkoutsContext()
    // const {user}=useAuthContext()
    // if(!user){
    //     return
    // }
    // const handleClick=async()=>{
    //     const response = await fetch('/api/workouts/'+workout._id,{
    //         method:'DELETE',
    //         headers:{
    //             'Authorization':`Bearer ${user.token}`
    //         }
    //     })
    //     const json=await response.json()
    //     if(response.ok){
    //         dispatch({type:'DELETE_WORKOUT',payload:json})
    //     }
    // }
    return(
        <div className="workout-details">
            <h4>Applied Concession</h4>
            <p><strong>From: </strong>{conc.from}</p>
            <p><strong>To: </strong>{conc.to}</p>
            <p><strong>via: </strong>{conc.via}</p>
            <p><strong>Status: </strong></p>
            <p className={conc.grant ? "approve":"pending"}>{conc.grant ? "Approved":"Pending"}</p>
            <p>{formatDistanceToNow(new Date(conc.createdAt),{addSuffix:true})}</p>
            {/* <span className="material-symbols-outlined" onClick={handleClick}>delete</span> */}
        </div>
    )
}