import React from 'react';

const AuctionItem = ({ auction, setSelectedAuction }) => {
  return (
    <li onClick={() => setSelectedAuction(auction)}>
      <h3>{auction.itemName}</h3>
      <p>{auction.description}</p>
      <p>Current Bid: {auction.currentBid}</p>
      <p>Ends on: {new Date(auction.endTime).toLocaleString()}</p>
    </li>
  );
};

export default AuctionItem;
