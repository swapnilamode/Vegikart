
import React, { useState } from 'react';
import Logo from '../image/logoSide.png'
import './Sidebar.css';
import { SidebarData } from './Data';
import { UilBars } from '@iconscout/react-unicons';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = () => {
    const navigate = useNavigate(); // Initialize navigate hook

    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        },
    };

    return (
        <>
            <div className="bars"
                style={expanded ? { left: '60' } : { left: '5%' }}
                onClick={() => setExpanded(!expanded)}
            >
                <UilBars />
            </div>
            <motion.div className="Sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >

                {/* logo */}
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                    <span>
                        <span>Vendors</span>
                    </span>
                </div>

                {/* menu */}
                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (
                            <div className={selected === index ? 'menuItem active' : 'menuItem'}
                                key={index}
                                onClick={() => {
                                    setSelected(index);
                                    navigate(item.path); // Navigate to the selected item's path
                                }}
                            >
                                <item.icon />
                                <span>
                                    {item.heading}
                                </span>

                            </div>
                        );
                    })}

                </div>
            </motion.div>

        </>
    );
}

export default Sidebar;