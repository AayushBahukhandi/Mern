import React, { useState } from 'react';
import withAdminAuth from '../../pages/admin/withAdminAuth'

import {
    FaBars,
    FaUpload,
    FaRegPlusSquare,
    FaBoxOpen,
 
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './sidebar.css'

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
       
        {
            path:"/admin/CarouselUpload",
            name:"Carousel Upload",
            icon:<FaUpload/>
        },
        {
            path:"/admin/ProductDetails",
            name:"ProductDetails",
            icon:<FaBoxOpen/>
        },
        {
            path:"/admin/addProduct",
            name:" Add Product",
            icon:<FaRegPlusSquare/>
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "70px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Admin</h1>
                   <div style={{marginLeft: isOpen ? "100px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default withAdminAuth(Sidebar);
// Wrap each protected component with the withAdminAuth HOC
