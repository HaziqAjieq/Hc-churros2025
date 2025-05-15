import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

export default function usePromos() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/data/promos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      // Ensure we always get an array, even if the response structure changes
      const data = response.data;
      const promosArray = Array.isArray(data) 
        ? data 
        : (Array.isArray(data?.promos) 
          ? data.promos 
          : []);
      
      setPromos(promosArray);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPromos([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return { promos, loading, error, refreshPromos: fetchPromos };
}