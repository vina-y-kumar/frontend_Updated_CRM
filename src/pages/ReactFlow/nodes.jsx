import React from "react";
import { MarkerType, Position } from "reactflow";
export default [
  {
    id: "1",

    data: {
      label: "Thanks for your cart! Would you like to continue with purchase?",
    },
    position: { x: 250, y: 100 },
  },
  {
    id: "2",
    data: { label: "YES" },
    // type: "default",
    position: { x: 50, y: 300 },
  },
  {
    id: "3",
    data: { label: "NO" },
    position: { x: 400, y: 300 },
  },
  {
    id: "4",
    data: { label: "Sure! Please provide your full name" },
    position: { x: 130, y: 500 },
  },
  {
    id: "5",
    data: {
      label: "Feel free to continue purchase at your convenience. Thankyou!",
    },
    position: { x: 450, y: 500 },
  },
  {
    id: "6",
    data: { label: "Please Enter your shipping address!" },
    position: { x: 160, y: 700 },
  },
  {
    id: "7",
    data: {
      label:
        "Thanks for providing details! Which payment mode do you want to prefer?",
    },
    position: { x: 200, y: 900 },
  },
  {
    id: "8",
    type: "output",
    data: {
      label:
        "Thanks for confirming Cash on delivery as your payment mode! You will be updated shortly.",
    },
    position: { x: 100, y: 1100 },
  },
  {
    id: "9",
    type: "output",
    data: {
      label: "Thanks for your payment. Your product will be shipped soon!",
    },
    position: { x: 400, y: 1100 },
  },
];
