import axios from 'axios';

const API_URL = 'https://bidbetter-backend.onrender.com/api/auctions';  // Backend base URL

// Function to create an auction
export const createAuction = async (auctionData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, auctionData);
    return response.data;
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
};

// Function to get all auctions
export const getAuctions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
};

// Function to place a bid
export const placeBid = async (bidData) => {
  try {
    const response = await axios.post(`${API_URL}/bid`, bidData);
    return response.data;
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
};

// Function to close an auction
export const closeAuction = async (auctionId) => {
  try {
    const response = await axios.put(`${API_URL}/${auctionId}/close`);
    return response.data;
  } catch (error) {
    console.error("Error closing auction:", error);
    throw error;
  }
};
