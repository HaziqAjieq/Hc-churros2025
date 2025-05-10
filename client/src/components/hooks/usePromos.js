// usePromos.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL ;

export default function usePromos() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/promos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
        
      });
      setPromos(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return { promos, loading, error, refreshPromos: fetchPromos };
}