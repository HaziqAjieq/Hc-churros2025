import axios from 'axios'
import { useEffect } from 'react'



function App() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log(response.data.message)
  }

  useEffect(()=>{
    fetchAPI();
  },[])
  return (
    <>
      <div>Check console for API response</div>
    </>
  )
}

export default App
