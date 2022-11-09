import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (

      <div className="container mx-auto flex-col items-center">
        <div className='flex-col items-center justify-center h-screen'> 
            <input type="text" className="w-8/12" placeholder='Username'/>
            <input type="text" className="w-8/12" placeholder='Password'/>
        </div>
      </div>
  )
}

export default App
