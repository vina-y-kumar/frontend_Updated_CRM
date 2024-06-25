import React, { useState } from 'react';
import './Explore.css';
import TopNavbar from "../TopNavbar/TopNavbar.jsx";
import CompassIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, Button } from '@mui/material';

import exploreImage from './explorepage1.png';
import boostMarketingImage from './BoostMarketingApproach.png';
import marketingStrategyImage from './marketingStrategy.png';
import newSalesImage from './New Sales Strategies.png';


const ExplorePage = () => {

    const sampleData = [
        { id: 1, category:"Marketing Strategies",  title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: marketingStrategyImage },
        { id: 2,  category:"Boost Marketing Approach",title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: boostMarketingImage },
        { id: 3, category:"New Sales Strategies", title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: newSalesImage },
        { id: 4, category:"New Sales Strategies", title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: newSalesImage },
        { id: 5, category:"Marketing Strategies", title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: marketingStrategyImage },
        { id: 6, category:"Boost Marketing Approach", title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: boostMarketingImage },
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    // Function to handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Function to filter cards based on selected category
    const filteredCards = selectedCategory === "All" ? sampleData : sampleData.filter(card => card.category === selectedCategory);

    const renderCardButtons = (image) => {
        switch (image) {
            case  newSalesImage:
                return <button className="sales-strategy">New Sales Strategies</button>;
            case marketingStrategyImage:
                return <button className="marketing-strategy">Marketing Strategies</button>;
            case boostMarketingImage:
                return <button className="marketing-approach">Boost Marketing Appraoch</button>;
            default:
                return null;
        }
    };



    return (
        <div className="Explore-page">
            <div className="explore_nav">
                <TopNavbar />
            </div>
            <div className="explore-header">
                <CompassIcon style={{ width: '50px', height: '50px' }} className="compass-icon" />
                <h1>Know more about CRM</h1>
            </div>
            <div className="explore_head">
                <p>Ut est consequat occaecat pariatur et non co</p>
            </div>
            <div className="explore-hashtag">
                <span>Trending keywords:</span>
                <ul>
                <li className="keyword-sales">#Sales</li>
                    <li className="keyword-marketing">#Marketing Strategies</li>
                    <li className="keyword-automation">#Sales Automation</li>
                </ul>
            </div>
            <div className="explore_search-bar">
                    <TextField
            variant="outlined"
            placeholder="Search for articles"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            className="explore-search-bar"
        />
            </div>
            <div className="explore-content-box">
                <div className="explore-image-container">
                <img src={exploreImage} alt="Explore Page" className="explore-image" />
                </div>
                <div className="explorepage-description">
                <button className='marketingbutton'>Marketing Stratergies</button>
                    <h3>Fugiat non fugiat magna ipsum aliqua 
                    anim reprehenderit in qui duis eiusmod fefefesf</h3>
                    <p>Culpa amet sint excepteur mollit aliqua ullamco anim ullamco exercitation ipsum voluptate. Culpa reprehenderit ipsum anim ex velit aliqua non incididunt anim elit duis. Dolore tempor anim et amet eiusmod dolor fugiat nisi ut fugiat excepteur veniam mollit magna exercitation ad occaecat magna veniam. Dolore consectetur occaecat tempor consequ</p>
                    <button className='explorebutton'>See Article</button>
                </div>
            </div>
            <div className="explore-buttons">
                <button className="all-button" onClick={() => handleCategorySelect("All")}>All</button>
                <button className="sales-button" onClick={() => handleCategorySelect("New Sales Strategies")}>New Sales Strategies</button>
                <button className="marketing-button" onClick={() => handleCategorySelect("Marketing Strategies")}>Marketing Strategies</button>
                <button className="approach-button" onClick={() => handleCategorySelect("Boost Marketing Approach")}>Boost Marketing Approach</button>
            </div>
            <div className="explore-cards">
                {filteredCards.map(card => (
                    <div key={card.id} className="explore-card">
                        <img src={card.image} alt={card.title} className="card-image" />
                        <div className="card-content">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            {renderCardButtons(card.image)}
                        </div>
                    </div>
                ))}
            </div>
            <button className="explore-view-more">View More </button>
            <div className="related-categories">
                <h1>Related Categories</h1>
                <div className="related-buttons">
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        className="technology-button"
                    >
                        Technology
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        className="related-button sales-button"
                    >
                        Sales
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        className="related-button strategies-button"
                    >
                        Strategies
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        className="related-button customer-dealing-button"
                    >
                        Customer Dealing
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
