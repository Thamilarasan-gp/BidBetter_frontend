import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdOutlineGavel } from "react-icons/md";
import axios from "axios";
import "./LiveAuction.css";

const LiveAuction = () => {
  const [viewAll, setViewAll] = useState(false);
  const [auctionItems, setAuctionItems] = useState([]);
  const navigate = useNavigate();

  // Static items as fallback
  const staticItems = [
    {
      id: 1,
      image: "https://www.icons.com/media/catalog/product/i/c/icvkcb2_virat_kohli_signed_miniature_cricket_bat.png",
      title: "Signed Cricket Bat by Virat Kohli",
      currentBid: "$10,000",
      buyNow: "$15,000",
      bids: 5,
    },
    {
      id: 2,
      image: "https://th.bing.com/th/id/OIP.iJslc1co8b4R1ZCQmF__vQHaHa?rs=1&pid=ImgDetMai",
      title: "Lionel Messi's Signed Jersey",
      currentBid: "$25,000",
      buyNow: "$30,000",
      bids: 3,
    },
    {
      id: 3,
      image: "https://cdn.shopify.com/s/files/1/1612/0223/products/ia_1024x1024.png?v=1570342032",
      title: "Kabaddi Match-Worn Jersey by Pardeep Narwal",
      currentBid: "$5,000",
      buyNow: "$7,000",
      bids: 2,
    },
    {
      id: 4,
      image: "https://i.pinimg.com/originals/74/f1/c9/74f1c98cf6c155a864053f0fec394862.jpg",
      title: "MS Dhoni's Captaincy Medal",
      currentBid: "$50,000",
      buyNow: "$60,000",
      bids: 8,
    },
    {
      id: 5,
      image: "https://th.bing.com/th/id/OIP.x6DQZ_aHIUlCHjVGQbDXCwHaHU?rs=1&pid=ImgDetMain",
      title: "Roger Federer's Signed Tennis Ball",
      currentBid: "$8,000",
      buyNow: "$12,000",
      bids: 4,
    },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      console.log('Starting to fetch items...');
      try {
        console.log('Making request to /items endpoint...');
        const response = await axios.get('https://bidbetter-backend.onrender.com/items');
        console.log('Raw response from backend:', {
          status: response.status,
          headers: response.headers,
          itemCount: response.data.length,
          firstItem: response.data[0] ? {
            id: response.data[0]._id,
            name: response.data[0].itemName,
            fields: Object.keys(response.data[0])
          } : 'No items'
        });
        
        console.log('\n--- Processing Items ---');
        const fetchedItems = response.data.map((item, index) => {
          console.log(`\nProcessing item ${index + 1}/${response.data.length}:`, {
            id: item._id,
            name: item.itemName,
            price: item.startingBid,
            category: item.sportsCategory,
            seller: item.sellerName,
            imageInfo: item.mainImage ? {
              contentType: item.mainImage.contentType,
              hasData: !!item.mainImage.imageData,
              dataType: item.mainImage.imageData ? typeof item.mainImage.imageData : 'none'
            } : 'no image'
          });

          // Convert buffer to base64 string for image display
          let imageStr;
          try {
            imageStr = item.mainImage 
              ? `data:${item.mainImage.contentType};base64,${arrayBufferToBase64(item.mainImage.imageData.data)}`
              : staticItems[0].image;
            console.log('Image conversion successful');
          } catch (imgError) {
            console.error('Image conversion failed:', imgError);
            imageStr = staticItems[0].image;
          }

          return {
            id: item._id,
            image: imageStr,
            title: item.itemName,
            currentBid: `$${item.startingBid}`,
            buyNow: `$${Math.floor(item.startingBid * 1.5)}`,
            bids: 0,
            description: item.description,
            endTime: new Date(item.endTime),
          };
        });

        console.log('\n--- Final Data ---');
        console.log('Processed items count:', fetchedItems.length);
        console.log('Sample processed item:', fetchedItems[0]);

        // Combine fetched items with static items
        const combinedItems = [...fetchedItems, ...staticItems];
        console.log('Total combined items:', combinedItems.length);
        
        setAuctionItems(combinedItems);
        console.log('State updated with combined items');
      } catch (error) {
        console.error('\n--- Error Details ---', {
          message: error.message,
          response: {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
          },
          request: {
            method: error.config?.method,
            url: error.config?.url,
            headers: error.config?.headers
          }
        });
        setAuctionItems(staticItems);
        console.log('Fallback to static items due to error');
      }
    };

    fetchItems();
  }, []);

  // Helper function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleProductClick = (itemId) => {
    navigate(`/productdetails/${itemId}`);
  };

  const displayedItems = viewAll ? auctionItems : auctionItems.slice(0, 4);

  return (
    <div className="sports-auction-container">
      <main className="sports-auction-main">
        <h2 className="sports-auction-title">Sports Memorabilia Auction</h2>
        <p className="sports-auction-subtitle">
          Bid on exclusive sports items from cricket, football, kabaddi, and more.
        </p>

        <div className="sports-auction-grid">
          {displayedItems.map((item) => (
            <div key={item.id} className="sports-auction-card" onClick={() => handleProductClick(item.id)}>
              <div className="sports-auction-card-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="sports-auction-card-image"
                />
                <div className="sports-auction-stock-tag">On Stock</div>
                <div className="sports-auction-bid-tag">{item.bids} Bids</div>
              </div>
              <h3 className="sports-auction-card-title">{item.title}</h3>
              <div className="sports-auction-card-details">
                <p>
                  <strong>Current Bid:</strong> {item.currentBid}
                </p>
                <p>
                  <strong>Buy Now:</strong> {item.buyNow}
                </p>
              </div>
              <div className="sports-auction-card-actions">
                <button className="bid-button" onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(item.id);
                }}>
                  <MdOutlineGavel /> Place Bid
                </button>
                <button className="wishlist-button">
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="sports-auction-view-all">
          <button onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "View All"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default LiveAuction;
