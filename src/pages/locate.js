import { Link } from "react-router-dom"

export default function Locate(){
    return(
        <div className="content">
            <h1>Already have an Account?</h1>
            <div className="anchor">
            <Link to='/login'><div className="a log"><p>Log in</p></div></Link>
            <Link to='/signup'><div className="a sign"><p>Sign up</p></div></Link>
            </div>
        </div>
    )
}