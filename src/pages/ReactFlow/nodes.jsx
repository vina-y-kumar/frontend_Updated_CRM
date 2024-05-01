import React from "react";
import { MarkerType, Position } from "reactflow";

export default [
  {
    id: "11",
    type: "customNode",
    data: {
      heading: "Flow Graph",
      content:
        "Thanks for your cart! Would you like to continue with purchase?",
      headbg: "orange",
    },
    sourcePosition: "right",
    targetPosition: "left",
    position: { x: 250, y: 100 },

    // style:{border:"2px solid yellow", color:"blue",  fontWeight:"600", backgroundColor:"#fdffcd"}
  },
  {
    id: "1",

    data: {
      label: "Thanks for your cart! Would you like to continue with purchase?",
      
    },
    position: { x: 250, y: 100 },
    style:{border:"2px solid yellow", color:"blue", padding:"10px", fontWeight:"600", backgroundColor:"#fdffcd"}
  },
  {
    id: "2",
    data: { label: "YES" },
    // type: "default",w
    position: { x: 50, y: 300 },
    style:{border:"2px solid lightgreen",fontWeight:"600",backgroundColor:"lightgreen"}
  },
  {
    id: "3",
    data: { label: "NO" },
    position: { x: 400, y: 300 },
    style:{border:"2px solid red",fontWeight:"600",backgroundColor:"#f70776"}
  },
  {
    id: "4",
    data: { label: "Sure! Please provide your full name" },
    position: { x: 130, y: 500 },
    style:{border:"2px solid aqua",fontWeight:"600",backgroundColor:"#8ef6e4"}
  },
  {
    id: "5",
    data: {
      label: "Feel free to continue purchase at your convenience. Thankyou!",
    },
    position: { x: 450, y: 500 },
    style:{border:"2px solid orange",fontWeight:"600",backgroundColor:"#ff894c"}
  },
  {
    id: "6",
    data: { label: "Please Enter your shipping address!" },
    position: { x: 160, y: 700 },
    style:{border:"2px solid grey",fontWeight:"600",backgroundColor:"#fcf4d9"}
  },
  {
    id: "7",
    data: {
      label:
        "Thanks for providing details! Which payment mode do you want to prefer?",
    },
    position: { x: 200, y: 900 },
    style:{border:"2px solid blue",fontWeight:"600",backgroundColor:"#a5bdfd"}
  },
  {
    id: "8",
    type: "output",
    data: {
      label:
        "Thanks for confirming Cash on delivery as your payment mode! You will be updated shortly.",
    },
    position: { x: 100, y: 1100 },
    style:{border:"2px solid lightblue",fontWeight:"600",backgroundColor:"#8ef6e4"}
  },
  {
    id: "9",
    type: "output",
    data: {
      label: " Your product will be shipped soon!",
    },
    position: { x: 400, y: 1100 },
    style:{border:"2px solid #ffb5b5",fontWeight:"600",backgroundColor:"#ffb5b5"}
  },
  {
    id: "10",
    data: { label: "Wubba " },
    position: { x: 400, y: 300 },
    style:{border:"2px solid red",fontWeight:"600",backgroundColor:"#f70776"}
  },
  
];
