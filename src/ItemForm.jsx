import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sportsCategory, setSportsCategory] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setMainImage(files[0]);
    }
  };

  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    if (files) {
      setThumbnails(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('startingBid', startingBid);
    formData.append('endTime', endTime);
    formData.append('sellerName', sellerName);
    formData.append('sportsCategory', sportsCategory);
    formData.append('deliveryMethod', deliveryMethod);

    if (mainImage) formData.append('mainImage', mainImage);
    for (let i = 0; i < thumbnails.length; i++) {
      formData.append('thumbnails', thumbnails[i]);
    }

    try {
      const response = await axios.post('https://bidbetter-backend.onrender.com/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Item uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('Error uploading item');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <label>Starting Bid</label>
        <input type="number" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
      </div>
      <div>
        <label>End Time</label>
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <div>
        <label>Seller Name</label>
        <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required />
      </div>
      <div>
        <label>Sports Category</label>
        <input type="text" value={sportsCategory} onChange={(e) => setSportsCategory(e.target.value)} required />
      </div>
      <div>
        <label>Delivery Method</label>
        <input type="text" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} required />
      </div>
      <div>
        <label>Main Image</label>
        <input type="file" onChange={handleImageChange} required />
      </div>
      <div>
        <label>Thumbnails</label>
        <input type="file" multiple onChange={handleThumbnailChange} />
      </div>
      <button type="submit">Upload Item</button>
    </form>
  );
};

export default ItemForm;
