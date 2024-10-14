import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { router } from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
        <RouterProvider router={router}/>
        <ToastContainer />
      </div>
    
    </>
  )
}

export default App
