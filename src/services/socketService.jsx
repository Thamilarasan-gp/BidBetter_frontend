// src/services/socketService.jsx
import io from 'socket.io-client';

// Replace with your backend server URL
const socket = io('https://bidbetter-backend.onrender.com');  // or your actual backend URL

export { socket };
