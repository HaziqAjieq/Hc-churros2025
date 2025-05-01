import axios from 'axios';
import { useState, useRef } from 'react';

function EditDialog({ stall, onClose, onSave }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(stall?.image_path?.split('/').pop() || '');
  const [previewImage, setPreviewImage] = useState(stall?.image_path || '');
  const [formData, setFormData] = useState({
    stall_name: stall?.stall_name || '',
    address: stall?.address || '',
    google_maps_url: stall?.google_maps_url || '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('stall_name', formData.stall_name);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('google_maps_url', formData.google_maps_url);
      
      // Append file if selected
      if (fileInputRef.current?.files[0]) {
        formDataToSend.append('image', fileInputRef.current.files[0]);
      }

      // If editing existing stall, include stall_id
      if (stall?.stall_id) {
        formDataToSend.append('stall_id', stall.stall_id);
      }

      // Call onSave with FormData
      await onSave(formDataToSend);
      
    } catch (err) {
      setError(err.message || 'Failed to save stall');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Image input */}
          <div className="mb-4">
            <input
              type="file"
              id="img"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="img"
              className="file-upload-label flex flex-col gap-2 items-center px-4 py-2 rounded-lg bg-yellow hover:bg-amber-500 cursor-pointer transition-colors duration-200"
            >
              <span>
                <i className="fa-solid fa-image"></i>
              </span>
              <span>
                {fileName ? fileName : 'Upload Image'}
              </span>
            </label>
            
            {fileName && (
              <p className="mt-1 text-sm text-gray-600">Selected: {fileName}</p>
            )}
            
            {/* Image preview */}
            {previewImage && (
              <div className="mt-4">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="max-h-40 mx-auto rounded"
                />
              </div>
            )}
          </div>

          {/* Stall Name input */}
          <div className="flex flex-col gap-3 py-4">
            <div className="w-full">
              <label className="block mb-1">Stall Name:</label>
              <input
                type="text"
                name="stall_name"
                value={formData.stall_name}
                onChange={handleInputChange}
                className="bg-white w-full text-black border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-1">Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-white resize-none w-full text-black border border-gray-300 p-2 rounded"
                required
                rows={3}
              />
            </div>

            <div className="w-full">
              <label className="block mb-1">Google Maps URL:</label>
              <input
                type="url"
                name="google_maps_url"
                value={formData.google_maps_url}
                onChange={handleInputChange}
                className="bg-white w-full text-black border border-gray-300 p-2 rounded"
                required
                placeholder="https://www.google.com/maps?q=..."
              />
            </div>
          </div>
          
          <div className="flex flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 py-2 px-4 rounded-2xl font-semibold hover:bg-gray-400 transition-colors"
              disabled={isSubmitting}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-yellow py-2 px-4 rounded-2xl font-semibold hover:bg-amber-500 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDialog;