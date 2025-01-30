import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ImageUploader.css';

const ImageUploader = () => {
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Form state
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sportsCategory, setSportsCategory] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Shipping');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const itemData = JSON.parse(localStorage.getItem("itemData"));
    const selectedCategories = JSON.parse(localStorage.getItem("selectedCategories"));

    if (itemData) {
      setItemName(itemData.itemName);
      setDescription(itemData.description);
      setStartingBid(itemData.startingBid);
      setEndTime(itemData.endTime);
    }

    if (selectedCategories) {
      setCategories(selectedCategories);
    }
  }, []);

  // Handle file change (main image)
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  // Handle file change (thumbnails)
  const handleThumbnailsChange = (e) => {
    const files = Array.from(e.target.files);
    setThumbnails(files);
  };

  // Handle clear image
  const clearMainImage = () => {
    setMainImage(null);
  };

  // Handle clear thumbnails
  const clearThumbnails = () => {
    setThumbnails([]);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setUploadStatus('Uploading...');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    
    // Append form fields
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('startingBid', startingBid);
    formData.append('endTime', endTime);
    formData.append('sportsCategory', sportsCategory);
    formData.append('deliveryMethod', deliveryMethod);

    // Append main image
    if (mainImage) {
      formData.append('mainImage', mainImage, mainImage.name);
    }
    
    // Append thumbnails
    thumbnails.forEach((file) => {
      formData.append('thumbnails', file, file.name);
    });

    try {
      const response = await axios.post('https://bidbetter-backend.onrender.com/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      setUploadStatus('Upload Successful!');
      // Redirect to my products page after successful upload
      setTimeout(() => {
        navigate('/Home');
      }, 1500);
    } catch (error) {
      console.error('Upload Error:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setUploadStatus(`Upload Failed: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="image-uploader-container">
      <h1>Upload Item</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Item Name:</label>
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Starting Bid:</label>
          <input 
            type="number" 
            value={startingBid} 
            onChange={(e) => setStartingBid(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input 
            type="datetime-local" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Sports Category:</label>
          <select 
            value={sportsCategory} 
            onChange={(e) => setSportsCategory(e.target.value)} 
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Delivery Method:</label>
          <select 
            value={deliveryMethod} 
            onChange={(e) => setDeliveryMethod(e.target.value)}
          >
            <option value="Shipping">Shipping</option>
            <option value="Pickup">Pickup</option>
            <option value="Courier">Courier</option>
          </select>
        </div>
        <div className="form-group">
          <label>Main Image:</label>
          <input 
            type="file" 
            onChange={handleMainImageChange} 
            accept="image/*" 
            required 
          />
          {mainImage && (
            <div className="image-preview">
              <img src={URL.createObjectURL(mainImage)} alt="Main" />
              <button type="button" onClick={clearMainImage}>Clear</button>
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Thumbnails:</label>
          <input 
            type="file" 
            multiple 
            onChange={handleThumbnailsChange} 
            accept="image/*" 
          />
          {thumbnails.length > 0 && (
            <div className="thumbnails-preview">
              {thumbnails.map((file, index) => (
                <div key={index} className="thumbnail-item">
                  <img src={URL.createObjectURL(file)} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
              <button type="button" onClick={clearThumbnails}>Clear Thumbnails</button>
            </div>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Item'}
        </button>
      </form>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default ImageUploader;
