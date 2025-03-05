import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-auto p-6 bg-black justify-between flex'>
      <Link to={{
        pathname: '/',
        search: `?username=${'ted'}`
      }}>
        <h1 className='font-bold text-xl text-purple-300'>
            StudyBuddy
        </h1>
      </Link>
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default Navbar
