import React, { useState, useEffect } from 'react';
import './AuctionRoom.css';

const AuctionRoom = () => {
    const [timer, setTimer] = useState(5 * 60); // 5 minutes countdown
    const [bidAmount, setBidAmount] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleBidSubmit = () => {
        if (bidAmount) {
            alert(`Bid of ₹${bidAmount} placed!`);
            setBidAmount('');
        }
    };

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return (
        <div className="auction-container">
            <header className="header">
                <div className="logo">
                    <h2>IPL AUCTION 2020</h2>
                </div>
                <nav className="nav">
                    <button className="active">BIDDING</button>
                    <button>LIVE AUCTION</button>
                    <button>Budget</button>
                </nav>
                <div className="timer-container">
                    <div className="timer">{minutes}m {seconds}s</div>
                </div>
            </header>

            <div className='card-container'>
                <div className="player-card">
                    <img src="https://s.ndtvimg.com/images/content/2016/jul/806/ms-dhoni-champions-trophy-0707.jpg" alt="M.S Dhoni" />
                    <div className="info">
                        <h3>M.S DHONI</h3>
                        <p>Matches: 134 | Runs: 5120 | Avg: 46.55</p>
                        <p>30 Thirties | 25 Fifties | Strike Rate: 120.8</p>
                        <p>IPL T20 Rating: 6</p>
                        <div className="stats">
                            <span>Matches</span><span>134</span>
                            <span>Runs</span><span>5120</span>
                            <span>Avg</span><span>46.55</span>
                        </div>
                        <div className="current-bid">
                            <h3>₹1250 L<span>| Current Bid</span></h3>
                        </div>
                        <p>CSK Raised for 1250 L</p>
                    </div>
                </div>

                <div className="team-table">
                    <h3>Team Table</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Batsmen</th>
                                <th>Bowlers</th>
                                <th>All-rounders</th>
                                <th>Wicketkeepers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CSK</td>
                                <td>4</td>
                                <td>3</td>
                                <td>2</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>MI</td>
                                <td>5</td>
                                <td>2</td>
                                <td>3</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>RCB</td>
                                <td>3</td>
                                <td>4</td>
                                <td>2</td>
                                <td>1</td>
                                <td>65.8L</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <div className="upcoming-players">
                    <h3>Upcoming Players</h3>
                    <ul>
                        <li>Virat Kohli</li>
                        <li>Rohit Sharma</li>
                        <li>KL Rahul</li>
                        <li>Shubman Gill</li>
                    </ul>
                </div>

                <div className="place-bid">
                    <h3>Place a Bid</h3>
                    <div className="bid-controls">
                        <button className="bid-btn">+25L</button>
                        <button className="bid-btn">+50L</button>
                        <button className="bid-btn">+100L</button>
                    </div>
                    <p>Chennai Super Kings</p>
                </div>
            </div>
        </div>
    );
};

export default AuctionRoom;