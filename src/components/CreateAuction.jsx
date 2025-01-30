import React, { useState } from 'react';
import { createAuction } from './services/api';

const CreateAuction = () => {
  const [auctionName, setAuctionName] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auctionData = {
      auctionName,
      auctionDescription,
    };

    try {
      const createdAuction = await createAuction(auctionData);
      console.log('Auction created:', createdAuction);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <div>
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Auction Name</label>
          <input
            type="text"
            value={auctionName}
            onChange={(e) => setAuctionName(e.target.value)}
          />
        </div>
        <div>
          <label>Auction Description</label>
          <input
            type="text"
            value={auctionDescription}
            onChange={(e) => setAuctionDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
};

export default CreateAuction;
