import axios from 'axios';

const API_URL = 'https://bidbetter-backend.onrender.com/api/bids'; // Adjust based on your backend URL

const placeBid = (bidData) => {
  return axios.post(`${API_URL}/bid`, bidData);
};

const BidService = {
  placeBid,
};

export default BidService;
