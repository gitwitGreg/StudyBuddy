import { useParams } from "react-router-dom"


const Profile = () => {
  const { email } = useParams()
  console.log("email: ", email)

  return (
    <div className='w-full h-screen bg-red-500 text-black'>
      Profile
    </div>
  )
}

export default Profile
