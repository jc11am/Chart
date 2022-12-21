import { useEffect, useState } from "react"
import axios from "axios"


const Chat = function() {

    const [ users, setUsers ] = useState([])
 

const fetchData = async function(){
    const { data } = await axios.get("/api/chat")
        setUsers(data)
}

useEffect(function(){
    fetchData()
}, [])

    return(
        <div>
            {users.map((user)=>(
                <div key={user._id}>
                    { user.chatName }
                </div>
            ))}
        </div>
    )
}

export default Chat