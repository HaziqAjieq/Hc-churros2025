import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AuthContext = createContext();


export default function AuthContext({children}) {
  const [admin , setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  return (
    <div>
      
    </div>
  )
}
