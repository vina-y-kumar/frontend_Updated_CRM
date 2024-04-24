import React from "react";
import { Handle, MarkerType, Position } from "reactflow";
export default [
  {
    id: "1",
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
    id: "2",
    data: { label: "YES" },
    // type: "default",
    position: { x: 50, y: 300 },
    style: {
      border: "2px solid lightgreen",
      fontWeight: "600",
      backgroundColor: "lightgreen",
    },
  },
  {
    id: "3",
    data: { label: "NO" },
    position: { x: 400, y: 300 },
    style: {
      border: "2px solid red",
      fontWeight: "600",
      backgroundColor: "#f70776",
    },
  },
  {
    id: "4",
    type: "customNode",
    data: {
      content: "Sure! Please provide your full name",
      heading: "Success",
      headbg: "lightgreen",
    },

    position: { x: 130, y: 500 },
    // style:{border:"2px solid aqua",fontWeight:"600",backgroundColor:"#8ef6e4"}
  },
  {
    id: "5",
    type: "customNode",
    data: {
      heading: "Negotiation",
      content: "Feel free to continue purchase at your convenience. Thankyou!",
      headbg: "red",
    },
    position: { x: 450, y: 500 },
    // style:{border:"2px solid orange",fontWeight:"600",backgroundColor:"#ff894c"}
  },
  {
    id: "6",
    type: "customNode",
    data: {
      heading: "Questionaire",
      content: "Please Enter your shipping address!",
      headbg: "pink",
    },
    position: { x: 160, y: 700 },
    // style:{border:"2px solid grey",fontWeight:"600",backgroundColor:"#fcf4d9"}
  },
  {
    id: "7",
    type: "customNode",
    data: {
      type: "customNode",
      heading: "Payment Mode",
      content:
        "Thanks for providing details! Which payment mode do you want to prefer?",
      headbg:"orange"
    },
    position: { x: 200, y: 900 },
    // style:{border:"2px solid blue",fontWeight:"600",backgroundColor:"#a5bdfd"}
  },
  {
    id: "8",
    type: "customNode",
    data: {
      heading:"COD",
      content:
        "Thanks for confirming Cash on delivery as your payment mode! You will be updated shortly.",
      headbg:'skyblue'
    },
    position: { x: 100, y: 1100 },
    // style: {
    //   border: "2px solid lightblue",
    //   fontWeight: "600",
    //   backgroundColor: "#8ef6e4",
    // },
  },
  {
    id: "9",
    type: "customNode",
    data: {
      heading:"Online Pay",
      content: "Thanks for your payment. Your product will be shipped soon!",
      headbg:'#ffb5b5'
    },
    position: { x: 400, y: 1100 },
    // style: {
    //   border: "2px solid #ffb5b5",
    //   fontWeight: "600",
    //   backgroundColor: "#ffb5b5",
    // },
  },
];

export const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        width: "200px",
        border: "2px solid #ddd",
        textAlign: "center",
        borderRadius: "5px",
        padding: "0px",
      }}
    >
      <div style={{ backgroundColor: data.headbg, padding: "5px" ,color:'white'}}>
        <h3>{data.heading}</h3>
        {console.log(data.headbg)}
      </div>
      {/* <img src={data.image} alt="Node Image" style={{ maxWidth: '100%', height: 'auto' }} /> */}
      <div style={{ padding: "10px",fontWeight:"500", backgroundColor: "white" }}>
        <p>{data.content}</p>
      </div>
      {/* <button>{data.btn}</button> */}
      <Handle type="source" position={Position.Bottom} id={data.id} />
      <Handle type="target" position={Position.Top} id={data.id} />
    </div>
  );
};
