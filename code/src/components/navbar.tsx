//style imports
import styles from '../styles/layout.module.scss'; 
//functional imports
import React from "react";
//component imports
import Link from "next/link"; 
import Image from "next/image"; 

//Header functional component
export default function Header() {
    const navLinks = [
        {
            name: "matkat", //name of the link
            path: "/trips", //path of the link
        },
        {
            name: "asemat",
            path: "/stations", 
        },
    ];
    return (
        <header className={styles.header}>
            <a href="/">
                <div className={styles.logo}>
                    <Image
                        src="/road.png" //get image from 'public' folder
                        alt="bike logo" //alternative text for the image
                        width={70} 
                        height={70}
                    />
                    <h3>CityBike</h3>
                </div>
            </a>
            <nav className={styles.navigation}>
                {navLinks.map((link, index) => { //mapping through the navLinks array
                    return (
                        <div className={styles.menuItems}>
                            <Link href={link.path}>
                                <li key={index}>{link.name}</li>
                            </Link>
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}
