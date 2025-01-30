import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BidForm from './BidForm';

const AuctionDetails = () => {
  const { auctionId } = useParams(); // Get auctionId from URL
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch auction details by auctionId
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(`https://bidbetter-backend.onrender.com/api/auctions/${auctionId}`);
        setAuction(response.data.auction);  // Set auction details
        setBids(response.data.bids);  // Set bids
      } catch (err) {
        setError('Failed to fetch auction details');
        console.error('Error fetching auction details:', err);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]); // Run whenever auctionId changes

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {auction ? (
        <div>
          <h1>{auction.itemName}</h1>
          <p>{auction.description}</p>
          <p>Starting Bid: ₹{auction.startingBid}</p>
          <p>Current Bid: ₹{auction.currentBid}</p>
          <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>

          <h3>Previous Bids:</h3>
          <ul>
            {bids.length > 0 ? (
              bids.map((bid) => (
                <li key={bid._id}>
                  <strong>Bidder:</strong> {bid.bidder} <br />
                  <strong>Bid Amount:</strong> ₹{bid.bidAmount}
                </li>
              ))
            ) : (
              <p>No bids placed yet.</p>
            )}
          </ul>

          <BidForm auctionId={auctionId} />
        </div>
      ) : (
        <p>Loading auction details...</p>
      )}
    </div>
  );
};

export default AuctionDetails;
