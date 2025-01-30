import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BidForm = ({ auctionId }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch auction details whenever auctionId changes
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (auctionId) {
        try {
          const response = await axios.get(`https://bidbetter-backend.onrender.com/api/auctions/${auctionId}`);
          setAuctionDetails(response.data.auction);
          setError('');
        } catch (err) {
          console.error('Error fetching auction details:', err);
          setError('Failed to fetch auction details');
        }
      }
    };

    fetchAuctionDetails();
  }, [auctionId]); // Re-run when auctionId changes

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (!bidAmount || bidAmount <= 0) {
      setError('Please enter a valid bid amount.');
      return;
    }

    try {
      const response = await axios.post('https://bidbetter-backend.onrender.com/api/auctions/bid', {
        auctionId,
        bidAmount: Number(bidAmount),
        bidder: 'Majid', // Replace with dynamic user info if needed
      });

      setSuccess(response.data.message);
      setError('');
      setBidAmount('');
      
      // Refresh auction details after placing a bid
      const updatedAuction = await axios.get(`https://bidbetter-backend.onrender.com/api/auctions/${auctionId}`);
      setAuctionDetails(updatedAuction.data.auction);
    } catch (err) {
      console.error('Error placing bid:', err);

      // Check for specific error response from the backend
      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error === 'Auction has already ended') {
          setError('The auction is closed. No more bids can be placed.');
        } else {
          setError(err.response.data.error);
        }
      } else {
        setError('Failed to place bid.');
      }

      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Place Your Bid</h2>

      {auctionDetails && (
        <div>
          <p><strong>Auction: </strong>{auctionDetails.name}</p>
          <p><strong>Current Bid: </strong>{auctionDetails.currentBid}</p>
          <p><strong>Auction End Time: </strong>{new Date(auctionDetails.endTime).toLocaleString()}</p>
        </div>
      )}

      {/* Show success message */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Show error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleBidSubmit}>
        <label htmlFor="bidAmount">Enter Your Bid: </label>
        <input
          type="number"
          id="bidAmount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={auctionDetails && new Date() > new Date(auctionDetails.endTime)}>
          Submit Bid
        </button>
      </form>

      {/* Disable bidding message */}
      {auctionDetails && new Date() > new Date(auctionDetails.endTime) && (
        <p style={{ color: 'red' }}>This auction is closed. No bids are allowed.</p>
      )}
    </div>
  );
};

export default BidForm;
