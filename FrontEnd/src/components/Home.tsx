import {useUser } from '@clerk/clerk-react'
import Navbar from './Navbar';
import { useGetUserAccount } from '../lib/tanstackQuery/queriesAndMutations';
import {Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const user = useUser().user;
  const {data, isPending, isError} = useGetUserAccount(String(user?.primaryEmailAddress))
  const navigate = useNavigate();


  if(isError){
    return(
      <div>
        Something went wrong please try again
      </div>
    )
  }

  if(isPending){
    return(
      <div>
        Fetching user data
      </div>
    )
  }

  if(data){
    if(!data.name){
      navigate(`/profile?email=${user?.primaryEmailAddress}`)
    }
  }

  return (
    <>
      <Navbar />
      <div className='w-full h-auto flex item-center justify-center mb-0'>
        <input type='text' className='w-full p-4 outline-none text-white bg-black' placeholder='Find a buddy'>
        </input>
        <button className='bg-purple-300 p-2 h-100% w-40 cursor-pointer text-lg'>
          Search
        </button>
      </div>
      <div className='w-full h-screen'>
        <div className='w-full h-full'>
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}>
          </Map>
        </div>
      </div>
    </>

  )
}

export default Home
