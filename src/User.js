import React, {useEffect, useState} from 'react';
import axios from "./axios.js";
import { Link, useParams } from "react-router-dom";
function User() {
   const [user, setUser] = useState();
   const {id} = useParams();

   useEffect(() => {
        async function fetchData() {
            const requestUsers = await axios.get(`/users/${id}` );
            console.log(requestUsers);
            setUser(requestUsers.data);
            return requestUsers;
        } fetchData();

      }, [id]);
      
      console.table(user);
      //const { id: userId, name, username } = user || {};



    return (
    
       <div className='todoApp'>
         <div className='nav'>
          <Link to='/'> Go back</Link> 


          </div>
    { user ? (
        <div>
          
          <h2> {user.name}  =  {user.name.split(" ")[0].split("")[0]} {user.name.split(" ")[user.name.split(" ").length-1].split("")[0]}</h2>
          <p>{`Username: ${user.username}`}</p>
          <p>Address: {user.address.street},  {user.address.city}</p>
          <a href=''>{user.email}</a>

          
        </div>
      ) : (
        <p>1</p>
      )}
  

       </div>

    )
}
export default User
