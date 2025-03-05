import { User } from "../interfaces";

/**
 * 
 * @param email String with users email to be queried
 * @returns Json object with user data
 */
export async function getUserAccount (email: string) {

    console.log("Starting getuserAccount functioin, email: ", email);
    
    if(email == ""){
        return new Error("No user email provided to find user account");
    }

    const uri = `http://localhost:4000/user?email=${email}`


    const response = await fetch(uri, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        const error = await response.json();
        console.log(error.error);
        return
    }

    const user: User = await response.json();

    return user;

}