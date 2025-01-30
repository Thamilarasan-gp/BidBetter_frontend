import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLink } from 'react-icons/fa';
import './InviteCode.css';
import { Link } from 'react-router-dom';
const InviteCode = () => {
  const [roomId, setRoomId] = useState('1234567890');
  const roomUrl = `https://your-auction-url.com/${roomId}`;  // Replace with your actual URL

  const shareRoomId = (platform) => {
    const message = `Join my auction room: ${roomUrl}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else if (platform === 'instagram') {
      window.open(`https://www.instagram.com/share?url=${encodeURIComponent(roomUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(roomUrl)}`, '_blank');
    } else if (platform === 'generic') {
      if (navigator.share) {
        navigator.share({
          title: 'Auction Room',
          text: 'Join my auction room!',
          url: roomUrl,
        }).catch((error) => console.error('Error sharing:', error));
      } else {
        alert('Your browser does not support the Web Share API');
      }
    }
  };

  return (
    <div className="invite-code-container">
      <div className="layout-container">
        <div className="header">
          <div className="header-content">
            <h1>Invite friends to join your auction</h1>
            <p>
              Share the room ID with friends so they can join your auction. The auction will start when you have 2 or more people.
            </p>
          </div>
        </div>

        <div className="form-section">
          <label className="input-label">
            <div className="input-container">
              <input
                className="form-input"
                value={roomId}
                readOnly
                onFocus={(e) => e.target.select()}
              />
              <div className="copy-button" onClick={() => navigator.clipboard.writeText(roomId)}>
                <FaLink size={20} />
              </div>
            </div>
          </label>
        </div>

        <div className="invite-methods">
          <div className="invite-method" onClick={() => shareRoomId('whatsapp')}>
            <FaWhatsapp size={24} />
            <div className="invite-method-content">
              <h2>Invite via WhatsApp</h2>
              <p>Send a WhatsApp invitation to your friends</p>
            </div>
          </div>
          <div className="invite-method" onClick={() => shareRoomId('instagram')}>
            <FaInstagram size={24} />
            <div className="invite-method-content">
              <h2>Invite via Instagram</h2>
              <p>Share via Instagram</p>
            </div>
          </div>
          <div className="invite-method" onClick={() => shareRoomId('facebook')}>
            <FaFacebook size={24} />
            <div className="invite-method-content">
              <h2>Invite via Facebook</h2>
              <p>Share via Facebook</p>
            </div>
          </div>
          <div className="invite-method" onClick={() => shareRoomId('generic')}>
            <FaLink size={24} />
            <div className="invite-method-content">
              <h2>Copy Link</h2>
              <p>Copy the link to share it anywhere</p>
            </div>
          </div>
        </div>

        <div className="footer">
          <button className="start-auction-button">
            <Link to="/JoinRoom"> Start Auction</Link>  </button>
        </div>
      </div>
    </div>
  );
};

export default InviteCode;
