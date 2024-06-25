import React, { useState } from 'react';
import './readExplore.css';
import TopNavbar from "../TopNavbar/TopNavbar.jsx";

import exploreImage from './explorepage1.png';
import salesImage from './sales.png';
import boostMarketingImage from './BoostMarketingApproach.png';
import marketingStrategyImage from './marketingStrategy.png';
import newSalesImage from './New Sales Strategies.png';
const ExploreDetails =() =>{


    const sampleData = [
        { id: 1, category:"Marketing Strategies",  title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: marketingStrategyImage },
        { id: 2,  category:"Boost Marketing Approach",title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: boostMarketingImage },
        { id: 3, category:"New Sales Strategies", title: "Cupidatat adipisicing cil", description: "Id eu quis enim qui cupidatat irure exercitation elit adipisicing sit excepteur laboris incididunt culpa officia deserunt te", image: newSalesImage },
    ]
    return(
        <div className="readExplore-page">
        <div className="explore_nav">
            <TopNavbar />
        </div>
        <div className="readExplore-header"></div>
        <h1>Ullamco laborum id fugiat excepteur adipisicing <span>laborisfesfaFqefe</span></h1>
        <div className="readExplore-box">
                <img src={exploreImage} alt="Explore" className="readExplore-image" />
                <div className="readExplore-description">
                    <p>Occaecat cillum dolor mollit Lorem elit mollit adipisicing irure officia culpa consectetur. Eiusmod mollit veniam est culpa cupidatat ut sint dolore fugiat cupidatat sit esse adipisicing. Exercitation ipsum amet cillum elit minim veniam sit et excepteur culpa. Do ut ut officia fugiat amet sit et enim proident cillum do eiusmod ad incididunt in. Quis veniam sint nostrud voluptate deserunt cillum occaecat ad officia.Ut sint ex id dolor consectetur consectetur enim proident ull
Occaecat cillum dolor mollit Lorem elit mollit adipisicing irure officia culpa consectetur. Eiusmod mollit veniam est culpa cupidatat ut sint dolore fugiat cupidatat sit esse adipisicing. Exercitation ipsum amet cillum elit minim veniam sit et excepteur culpa. Do ut ut officia fugiat amet sit et enim proident cillum do eiusmod ad incididunt in. Quis veniam sint nostrud voluptate deserunt cillum occaecat ad officia.Ut sint ex id dolor consectetur consectetur enim proident ull
Occaecat cillum dolor mollit Lorem elit mollit adipisicing irure officia culpa consectetur. Eiusmod mollit veniam est culpa cupidatat ut sint dolore fugiat cupidatat sit esse adipisicing. Exercitation ipsum amet cillum elit minim veniam sit et excepteur culpa. Do ut ut officia fugiat amet sit et enim proident cillum do eiusmod ad incididunt in. Quis veniam sint nostrud voluptate deserunt cillum occaecat ad officia.Ut sint ex id dolor consectetur consectetur enim proident ull</p>
                </div>
            </div>
            <div className="readExplore-box2">
                <img src={salesImage} alt="Explore" className="readExplore-image2" />
                <div className="readExplore-description2">
                    <p>Occaecat cillum dolor mollit Lorem elit mollit adipisicing irure officia culpa consectetur. Eiusmod mollit veniam est culpa cupidatat ut sint dolore fugiat cupidatat sit esse adipisicing. Exercitation ipsum amet cillum elit minim veniam sit et excepteur culpa. Do ut ut officia fugiat amet sit et enim proident cillum do eiusmod ad incididunt in. Quis veniam sint nostrud voluptate deserunt cillum occaecat ad officia.Ut sint ex id dolor consectetur consectetur enim proident ull
Occaecat cillum dolor mollit Lorem elit mollit adipisicing irure officia culpa consectetur. Eiusmod mollit veniam est culpa cupidatat ut sint dolore fugiat cupidatat sit esse adipisicing. Exercitation ipsum amet cillum elit minim veniam sit et excepteur culpa. Do ut ut officia fugiat amet sit et enim proident cillum do eiusmod ad incididunt in. Quis veniam sint nostrud voluptate deserunt cillum occaecat ad officia.Ut sint ex id dolor consectetur consectetur enim proident ull
Occaecat cillum dolor mollit Lorem elit mollit adipisicing irure officia culpa consectetur. Eiusmod mollit veniam est culpa cupidatat ut sint dolore fugiat cupidatat sit esse adipisicing. Exercitation ipsum amet cillum elit minim veniam sit et excepteur culpa. Do ut ut officia fugiat amet sit et enim proident cillum do eiusmod ad incididunt in. Quis veniam sint nostrud voluptate deserunt cillum occaecat ad officia.Ut sint ex id dolor consectetur consectetur enim proident ull</p>
                </div>
                </div>
                <hr className="exploredivider" />

<div className="readcard-container">
    {sampleData.map(item => (
        <div key={item.id} className="card">
            <img src={item.image} alt={item.title} className="readcard-image" />
            <div className="readcard-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        </div>
    ))}
</div>
        </div>
    );
};

export default ExploreDetails;