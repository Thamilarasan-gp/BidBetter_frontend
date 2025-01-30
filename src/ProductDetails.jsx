import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./ProductDetails.css";
import Payment from './components/Payment';

const socket = io("https://bidbetter-backend.onrender.com");

const ProductDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const [bids, setBids] = useState([]);
  const [bidLoading, setBidLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [isHighestBidder, setIsHighestBidder] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Helper function to convert buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await axios.get('https://bidbetter-backend.onrender.com/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://bidbetter-backend.onrender.com/items/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  // Socket.IO setup for comments
  useEffect(() => {
    if (id) {
      socket.on('new_comment', (newComment) => {
        setComments(prevComments => [newComment, ...prevComments]);
      });

      return () => {
        socket.off('new_comment');
      };
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user) {
      alert('Please log in to comment');
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setCommentLoading(true);
    try {
      await axios.post(`https://bidbetter-backend.onrender.com/items/${id}/comments`, {
        userId: user.userId,
        username: user.username,
        content: comment.trim(),
        userAvatar: user.avatar
      });

      // Comment will be added through socket
      setComment("");
      setIsSubmitDisabled(true);
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setCommentLoading(false);
    }
  };

  // Fetch bid history
  const fetchBidHistory = async () => {
    try {
      const response = await axios.get(`https://bidbetter-backend.onrender.com/items/${id}/bids`);
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bid history:', error);
    }
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://bidbetter-backend.onrender.com/items/${id}`);
        const itemData = response.data;
        
        // Convert main image
        const mainImageStr = itemData.mainImage
          ? `data:${itemData.mainImage.contentType};base64,${arrayBufferToBase64(itemData.mainImage.imageData.data)}`
          : null;

        // Convert thumbnails
        const thumbnailsStr = itemData.thumbnails
          ? itemData.thumbnails.map(thumb => 
              `data:${thumb.contentType};base64,${arrayBufferToBase64(thumb.imageData.data)}`)
          : [];

        setItem({
          ...itemData,
          mainImageUrl: mainImageStr,
          thumbnailUrls: thumbnailsStr
        });
        setSelectedImage(mainImageStr);
        
        // Check if auction has ended immediately
        const now = new Date().getTime();
        const endTime = new Date(itemData.endTime).getTime();
        if (now >= endTime) {
          setTimeLeft('Auction ended');
          setAuctionEnded(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError('Failed to load item details');
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
      fetchBidHistory();
    }
  }, [id]);

  // Socket.IO setup for bids
  useEffect(() => {
    if (id) {
      socket.emit('join_item', id);

      socket.on('new_bid', (newBid) => {
        console.log('New bid received:', newBid);
        setBids(prevBids => [newBid, ...prevBids]);
      });

      return () => {
        socket.emit('leave_item', id);
        socket.off('new_bid');
      };
    }
  }, [id]);

  // Check auction end time and update status
  useEffect(() => {
    const checkAuctionEnd = () => {
      if (item && user) {
        const now = new Date().getTime();
        const endTime = new Date(item.endTime).getTime();
        
        if (now >= endTime) {
          setAuctionEnded(true);
          setTimeLeft('Auction ended');
          
          // Check if current user is highest bidder
          if (bids.length > 0) {
            const highestBid = bids[0];
            setIsHighestBidder(highestBid.userId === user.userId);
          }
        } else {
          const timeRemaining = endTime - now;
          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
          setAuctionEnded(false);
          setIsHighestBidder(false);
        }
      }
    };

    checkAuctionEnd();
    const timer = setInterval(checkAuctionEnd, 1000);

    return () => clearInterval(timer);
  }, [item, user, bids]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to place a bid');
      return;
    }

    setBidError("");
    setBidLoading(true);

    try {
      const response = await axios.post(`https://bidbetter-backend.onrender.com/items/${id}/bid`, {
        userId: user.userId,
        bidder: user.username,
        bidAmount: parseFloat(bidAmount),
        bidderAvatar: user.avatar
      });

      setBidAmount("");
      setBidLoading(false);
      
      // The new bid will be added through the socket event
      const newBid = response.data;
      setBids(prevBids => [newBid, ...prevBids]);
    } catch (error) {
      console.error('Error placing bid:', error);
      setBidError(error.response?.data?.error || 'Failed to place bid');
      setBidLoading(false);
    }
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setIsSubmitDisabled(e.target.value.trim() === "");
  };

  // Handle successful payment
  const handlePaymentSuccess = (response) => {
    setPaymentStatus('completed');
    alert('Payment successful! Thank you for your purchase.');
  };

  // Handle payment failure
  const handlePaymentFailure = (error) => {
    setPaymentError(error);
    alert('Payment failed. Please try again.');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!item) {
    return <div className="error">Item not found</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-wrapper">
        {/* Left Section - Images */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img src={selectedImage || item.mainImageUrl} alt={item.itemName} className="main-product-image" />
          </div>
          <div className="thumbnails-container">
            {item.thumbnailUrls.map((thumb, index) => (
              <div 
                key={index} 
                className={`thumbnail-wrapper ${selectedImage === thumb ? "active" : ""}`}
                onClick={() => handleThumbnailClick(thumb)}
              >
                <img
                  src={thumb}
                  alt={`${item.itemName} thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="product-info-section">
          <h1 className="product-title">{item.itemName}</h1>
          <div className="product-meta">
            <p className="seller-info">Seller: <span>{item.sellerName}</span></p>
            <p className="bids-count">Total Bids: <span>{bids.length}</span></p>
          </div>

          {/* Timer Display */}
          <div className="auction-timer">
            <h3>Time Remaining</h3>
            <p className={auctionEnded ? 'ended' : ''}>{timeLeft}</p>
          </div>

          {/* Payment Section */}
          {auctionEnded && (
            <div className="payment-section">
              {isHighestBidder ? (
                paymentStatus === 'pending' ? (
                  <>
                    <h3>Congratulations! You won the auction!</h3>
                    <p>Winning Bid: ₹{bids[0]?.bidAmount}</p>
                    <Payment 
                      amount={bids[0]?.bidAmount}
                      itemId={id}
                      onSuccess={handlePaymentSuccess}
                      onFailure={handlePaymentFailure}
                    />
                    {paymentError && (
                      <p className="payment-error">{paymentError}</p>
                    )}
                  </>
                ) : (
                  <div className="payment-success">
                    <h3>Payment Completed!</h3>
                    <p>Thank you for your purchase.</p>
                  </div>
                )
              ) : (
                <div className="auction-ended-message">
                  <h3>Auction Ended</h3>
                  <p>Winning Bid: ₹{bids[0]?.bidAmount || item.startingBid}</p>
                  <p>Winner: {bids[0]?.bidder || 'No bids placed'}</p>
                </div>
              )}
            </div>
          )}

          {/* Bid Section - Only show if auction is not ended */}
          {!auctionEnded && (
            <div className="bid-section">
              <div className="current-bid">
                <h3>Current Bid</h3>
                <p className="bid-amount">₹{bids[0]?.bidAmount || item.startingBid}</p>
              </div>
              <div className="place-bid">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                  min={bids.length > 0 ? bids[0].bidAmount + 1 : item.startingBid}
                />
                <button onClick={handleBidSubmit} disabled={!bidAmount || bidError}>
                  Place Bid
                </button>
                {isHighestBidder && (
                  <div className="buy-now-section">
                    <p>Buy now as highest bidder:</p>
                    <Payment 
                      amount={item.buyNowPrice || bids[0]?.bidAmount * 1.5}
                      itemId={id}
                      onSuccess={handlePaymentSuccess}
                      onFailure={handlePaymentFailure}
                    />
                  </div>
                )}
                {bidError && <p className="error-message">{bidError}</p>}
              </div>
            </div>
          )}

          <div className="bid-history">
            <h3>Bid History ({bids.length} bids)</h3>
            {bids.length === 0 ? (
              <p className="no-bids">No bids yet. Be the first to bid!</p>
            ) : (
              <div className="bid-list">
                {bids.map((bid) => (
                  <div key={bid._id} className="bid-history-item">
                    <img src={bid.bidderAvatar} alt={bid.bidder} className="bidder-avatar" />
                    <div className="bid-info">
                      <div className="bid-header">
                        <p className="bidder-name">{bid.bidder}</p>
                        <p className="bid-amount">₹{bid.bidAmount.toLocaleString()}</p>
                      </div>
                      <div className="bid-details">
                        <p className="bid-time">{bid.timeAgo}</p>
                        {bid.userId === user?.userId && (
                          <span className="your-bid-tag">Your bid</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-description">
            <h2>About This Item</h2>
            <p>{item.description}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>
        <div className="comment-form">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder={user ? "Add a comment..." : "Please log in to comment"}
            disabled={!user || commentLoading}
          />
          <button
            onClick={handleCommentSubmit}
            disabled={isSubmitDisabled || !user || commentLoading}
          >
            {commentLoading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <div className="comment-header">
                  <img src={comment.userAvatar} alt={comment.username} className="comment-avatar" />
                  <div className="comment-meta">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-time">{comment.timeAgo}</span>
                  </div>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
