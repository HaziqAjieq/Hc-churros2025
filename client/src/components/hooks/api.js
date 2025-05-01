import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/api';


export const fetchStalls = async () =>{
  try{
    const response = await fetch(`${API_BASE_URL}/stalls`);
    if(!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }catch (error) {
    console.error('Error fetching stalls:' , error);
    throw error;
  }
};

export const addStall = async (stallData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stalls` , {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(stallData),
    });

    if(!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error adding stall:' , error);
    throw error;
  }
}

export const updateStall = async (id ,stallData) => {
  try{
    const response =await fetch(`${API_BASE_URL}/stalls/${id}`, {
      method:'PUT',
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(stallData),
    });

    if(!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error updating strall: `,error);
    throw error;
  }
}

export const deleteStall = async (id) => {
  try{

    const response = await fetch(`${API_BASE_URL}/stall/${id}`, {
      method: 'DELETE',

    });

    if(!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error){
    console.error('Error deleting stall:' , error);
    throw error;
  }
}