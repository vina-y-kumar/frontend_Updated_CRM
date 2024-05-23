import React from "react";
import { Sidebar } from "../../../components/Sidebar";
import './instagrampost.css';
const InstagramPost = () => {
  return (
    <div className="Insta_post">
      <div className="sidebar_container_for_insta">
       <Sidebar/>
      </div>
      <div className=".Insta-header">
        <h1 className='meeting_head'>Instagram</h1>
        <div className="Instapost_main">
          <div className="Instapost_main_left">
          <div className="Instapost_content">
          <input placeholder="caption"></input>
          </div>
          <div className="Instapost_config">
            <input placeholder="schedule at date"></input>
          </div>
          <div className="Instapost_bottom_button">
            <button>Send</button>
          </div>
          </div>
          <div className="Instapost_main_right">
          <div className="Instapost_demo_content">Lorem Ipsum something something</div>
          <div className="Instapost_demo_display"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPost;
