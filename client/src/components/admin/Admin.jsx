import { useState, useEffect } from 'react';
import { useAuth } from '../auth-context/AuthContext';
import EditDialog from '../../components/EditDialog';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { admin, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editStall, setEditStall] = useState(null);
  const [stallList, setStallList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, authLoading, navigate]);

  // Fetch stalls from API with authentication
  useEffect(() => {
    if (!admin) return;

    const fetchStalls = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3000/api/admin/data/stalls', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            return;
          }
          throw new Error('Failed to fetch stalls');
        }

        const data = await response.json();
        setStallList(data);
      } catch (error) {
        console.error('Error fetching stalls:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStalls();
  }, [admin, logout]);

  // Add new stall with image upload
  const handleAddStall = async (data) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('stall_name', data.formData.stall_name);
      formData.append('address', data.formData.address);
      formData.append('google_maps_url', data.formData.google_maps_url || '');
      
      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }
  
      const response = await fetch('http://localhost:3000/api/admin/data/stalls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData,
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Failed to add stall');
      }
  
      const addedStall = await response.json();
      setStallList([...stallList, addedStall]);
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding stall:', error);
      setError(error.message);
    }
  };

  // Update stall with optional image update
  const handleEditStall = async (data) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('stall_name', data.formData.stall_name);
      formData.append('address', data.formData.address);
      formData.append('google_maps_url', data.formData.google_maps_url || '');
      
      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }
  
      const response = await fetch(
        `http://localhost:3000/api/admin/data/stalls/${editStall.stall_id}`, 
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Failed to update stall');
      }
  
      const updatedStallData = await response.json();
      setStallList(stallList.map(stall => 
        stall.stall_id === editStall.stall_id ? updatedStallData : stall
      ));
      setEditStall(null);
    } catch (error) {
      console.error('Error updating stall:', error);
      setError(error.message);
    }
  };

  // Delete stall
  const handleDeleteStall = async (id) => {
    try {
      setError(null);
      const response = await fetch(
        `http://localhost:3000/api/admin/data/stalls/${id}`, 
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Failed to delete stall');
      }

      setStallList(stallList.filter(stall => stall.stall_id !== id));
    } catch (error) {
      console.error('Error deleting stall:', error);
      setError(error.message);
    }
  };

  if (authLoading) return <div>Loading authentication...</div>;
  if (isLoading) return <div>Loading stalls...</div>;

  return (
    <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6">
      <div className="mt-[6.5rem] sm:mt-[7rem] md:mt-[7rem] lg:mt-[7rem]">
        <div className="cruid-container pt-10 flex flex-col bg-light-gray h-full w-full">
          {/* Error message display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* button for adding new input */}
          <div className="flex justify-end mr-8">
            {!isOpen && (
              <button
                className="add-btn bg-red py-4 px-5 rounded-2xl text-3xl text-white hover:text-yellow font-semibold cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>

          {/* Add Dialog */}
          {isOpen && (
            <EditDialog 
              key="add-dialog"
              onClose={() => setIsOpen(false)} 
              onSave={handleAddStall}
            />
          )}

          {/* Edit Dialog */}
          {editStall && (
            <EditDialog 
              key="edit-dialog"  
              stall={editStall}
              onClose={() => setEditStall(null)} 
              onSave={handleEditStall}
            />
          )}
          
          {/* crud item container*/}
          <div className="w-full h-full mt-4 rounded-2xl">
            {stallList.length === 0 ? (
              <div className="text-center py-10">
                No stalls found. Add your first stall!
              </div>
            ) : (
              stallList.map((stall) => (
                <div
                  key={stall.stall_id}
                  className="flex flex-col md:flex-row gap-2 my-4 min-h-[30vh] w-full items-center border-2 border-amber-500 bg-red rounded-2xl px-3"
                >
                  {/* image container */}
                  <div className="image-container h-[50vh] w-[50%] md:w-[70%] items-center overflow-hidden">
                    {stall.image_path ? (
                      <img
                        src={`http://localhost:3000${stall.image_path}`}
                        alt={stall.stall_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 md:grid-rows-2 items-center justify-center text-center md:text-balance">
                    <h1 className="col-span-1 row-auto text-3xl align-middle text-yellow">
                      {stall.stall_name}
                    </h1>
                    <p className="col-span-1 row-auto align-middle">
                      {stall.address}
                    </p>
                  </div>

                  {/* for button edit and delete */}
                  <div className="flex gap-2 text-white">
                    <button
                      type="button"
                      className="bg-yellow py-1 px-3 rounded-xl"
                      onClick={() => setEditStall(stall)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      type="button"
                      className="bg-yellow py-1 px-3 rounded-xl"
                      onClick={() => handleDeleteStall(stall.stall_id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}