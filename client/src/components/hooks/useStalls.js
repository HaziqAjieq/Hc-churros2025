import React from 'react';
import { useEffect , useState } from 'react'
import axios from 'axios'


const API_BASE_URL = import.meta.env.VITE_APP_API_URL ;

export default function useStalls() {
 

  const [stalls, setStalls] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStalls = async () =>{
      try{
        const response = await axios.get(`${API_BASE_URL}/api/stalls`);

        setStalls(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    };

    fetchStalls();
  }, []);



  return {stalls, loading ,error}
}
