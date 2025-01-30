import axios from 'axios';

const API_URL = 'https://bidbetter-backend.onrender.com/api/auctions';

export const getAuctions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
};

export const getAuctionById = async (auctionId) => {
  try {
    const response = await axios.get(`${API_URL}/${auctionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching auction:', error);
    throw error;
  }
};
