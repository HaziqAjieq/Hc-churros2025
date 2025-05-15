import React, { useState } from 'react';
import axios from 'axios';
import usePromos from '../../hooks/usePromos';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL ;


export default function PromoInput() {
  const { promos, loading, error, refreshPromos } = usePromos();
  const [newPromo, setNewPromo] = useState({
    name: '',
    image: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
   
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/data/promos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      
      refreshPromos(); // Refresh the list after deletion
      setDeleteError(null);
    } catch (error) {
      
      setDeleteError('Failed to delete promo. Please try again.');
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      }
    }
  };

  const handleFileChange = (e) => {
    setNewPromo({
      ...newPromo,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPromo.name || !newPromo.image) {
      alert('Please fill all fields');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('name', newPromo.name);
    formData.append('image', newPromo.image);

    try {
      await axios.post(`${API_BASE_URL}/api/admin/data/promos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
     
      setNewPromo({ name: '', image: null });
      document.getElementById('image-upload').value = '';
      refreshPromos();
    } catch (error) {
      alert('Error adding promo');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading promos...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error loading promos: {error}</div>;

  return (
    <div className="p-6 bg-red text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Promo Slide</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Add New Promo</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Promo Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-white text-black"
            value={newPromo.name}
            onChange={(e) => setNewPromo({...newPromo, name: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Promo Image</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded bg-white text-black"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isUploading}
          className={`px-4 py-2 rounded text-black font-semibold ${
            isUploading ? 'bg-amber-500' : 'bg-yellow-400 hover:bg-amber-500'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Add Promo'}
        </button>
      </form>

      <div>
  <h3 className="text-lg font-semibold mb-3">Current Promos</h3>
  {deleteError && (
    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
      {deleteError}
    </div>
  )}
  {!Array.isArray(promos) ? (
    <p className="text-gray-200">Invalid promos data format</p>
  ) : promos.length === 0 ? (
    <p className="text-gray-200">No promos available</p>
  ) : (
    <ul className="space-y-4">
      {promos.map((promo) => {
        if (!promo?.id) return null; // Skip invalid items
        
        return (
          <li key={promo.id} className="bg-white text-black p-4 rounded-lg">
            <div className="flex flex-col">
              <div className="mb-2">
                <img
                  src={
                    promo.image_path?.startsWith('http') 
                      ? promo.image_path 
                      : `${API_BASE_URL}${promo.image_path || ''}`
                  }
                  alt={promo.name || 'Promo image'}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/fallback-image.jpg';
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h4 className="font-medium text-lg">{promo.name || 'Untitled Promo'}</h4>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  )}
</div>
    </div>
  );
}