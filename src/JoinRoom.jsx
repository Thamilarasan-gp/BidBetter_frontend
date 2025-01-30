import React, { useState } from 'react';
import './JoinRoom.css';
import { Link } from 'react-router-dom';
const JoinRoom = () => {
  const [teamName, setTeamName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [teams] = useState([
    'CSK', 'RCB', 'KKR', 'MI', 'PBKS', 'KKR', 'RR', 'LSG', 'DC', 'GT'
  ]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'teamName') setTeamName(value);
    if (name === 'roomCode') setRoomCode(value);
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleJoinRoom = () => {
    if (selectedTeam && roomCode) {
      // Logic for joining the room with the selected team and room code
      console.log(`Joining Room: ${roomCode} with Team: ${selectedTeam}`);
    } else {
      alert('Please select a team and enter a room code');
    }
  };

  return (
    <div className="room-teams-container">
      <div className="room-teams-header">
        <div className="logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2>Auction House</h2>
        </div>
      </div>

      <div className="room-teams-body">
        <h3>Select a Team</h3>
        <div className="team-list">
          {teams.map((team, index) => (
            <button
              key={index}
              className={`team-button ${selectedTeam === team ? 'selected' : ''}`}
              onClick={() => handleSelectTeam(team)}
            >
              {team}
            </button>
          ))}
        </div>

        <div className="form-container">
          <h3>Enter Room Code</h3>
          <input
            type="text"
            name="roomCode"
            placeholder="Enter room code"
            value={roomCode}
            onChange={handleInputChange}
          />
          <button className="join-room-btn" onClick={handleJoinRoom}>
        
           <Link to="/AuctionRoom"> Join Room</Link>  
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
