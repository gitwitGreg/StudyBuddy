import { Routes,  Route} from 'react-router-dom';
import { SignedIn, SignedOut, SignIn} from "@clerk/clerk-react";
import Home from './components/Home';
import Profile from './components/Profile';


function App() {

  return (
    <>
    <SignedOut>
      <div className="flex p-0 w-full h-screen items-center justify-center bg-black">
          <SignIn/>
      </div>
    </SignedOut>
    
    <SignedIn>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </SignedIn>
    </>
   
  )
}

export default App
