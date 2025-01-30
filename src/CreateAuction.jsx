import React, { useState } from 'react';
import './CreateAuction.css';
import { Link } from 'react-router-dom';

const CreateAuction = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [roomName, setRoomName] = useState('');
  const [category, setCategory] = useState('');
  const [auctionDate, setAuctionDate] = useState('');
  const [duration, setDuration] = useState('');

  
  const handleCreateAuction = () => {
    // Logic for creating the auction room
    console.log("Auction Created:", {
      roomName,
      category,
      auctionDate,
      startTime,
      endTime,
      duration,
    });
  };

  return (
    <div className="create-auction-container">
      <div className="header">
        <h3 className="section-title">New Auction</h3>
        <p className="section-subtitle">Create a new auction room for your favorite sports.</p>
      </div>
      <div className="form-container">
        <label className="input-label">
          <p>Room name</p>
          <input
            placeholder="Enter room name"
            className="form-input"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <label className="input-label">
          <p>Auction Category</p>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a type</option>
            <option value="cricket">Cricket</option>
            <option value="kabaddi">Kabaddi</option>
          </select>
        </label>
        <label className="input-label">
          <p>Date</p>
          <select
            className="form-select"
            value={auctionDate}
            onChange={(e) => setAuctionDate(e.target.value)}
          >
            <option value="">Choose a date</option>
            <option value="2025-01-29">January 29, 2025</option>
            <option value="2025-01-30">January 30, 2025</option>
          </select>
        </label>
        <div className="time-duration-container">
          <label className="input-label">
            <p>Start Time</p>
            <input
              type="time"
              className="form-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label className="input-label">
            <p>End Time</p>
            <input
              type="time"
              className="form-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
        </div>
       
        <p className="auction-id">ID: 1234567890</p>
        <div className="action-buttons">
          <button className="cancel-button">Cancel</button>
      
          <button
            className="create-button"
            onClick={handleCreateAuction}
            disabled={!roomName || !category || !auctionDate || !startTime || !endTime || !duration}
          >
          <Link to="/invitecode"> Create Room</Link>  
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
