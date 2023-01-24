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
            name: "ASEMAT", //name of the link
            path: "/", //path of the link
        },
    ];
    return (
        <header className={styles.header}>
            <a href="/">
                <div className={styles.logo}>
                    <Image
                        src="/logo.png" //get image from 'public' folder
                        alt="bike logo" //alternative text for the image
                        width={100} 
                        height={60}
                    />
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
