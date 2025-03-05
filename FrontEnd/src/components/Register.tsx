import React, { useEffect, useState } from 'react'

const Register = () => {
    const [userName, setUserName] = useState<string| undefined>(undefined);
    const [error, setError] = useState<string | undefined>();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(userName){
        const response = await fetch('http://127.0.0.1:4000/api/username', {
          headers : {
            "Content-Type" : "application/json"
          },
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            id: 0,
            userName: "Greg",
            email: "Gmensah502@gmail.com",
            password: "Test",
            profilePicture: "",
            major: "Comp-sci",
            classes: []
          })
        })

        if(!response.ok){
          const error = await response.json();
          setError(error.error)
        }

        console.log("successful run");

        const userObj = await response.json();
        console.log(userObj)

      }else{
        setError("Missing username");
      }
    }
    
  return (
    <div className='h-screen w-full'>
        <form className='p-10 flex w-full h-auto' onSubmit={handleSubmit}>
            <input className='w-full p-4 bg-gray-100 rounded-xl' 
              name="username" type='text' onChange={(e) => setUserName(e.target.value)}></input>
            <button className='bg-red-500' type='submit'>Submit</button>
        </form>
  </div>
)
}

export default Register
