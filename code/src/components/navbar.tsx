import React from "react";
import Link from "next/link";
import styles from '../styles/layout.module.scss';
import Image from "next/image";

export default function Header() {
    const navLinks = [
/*         {
            name: "Etusivu",
            path: "/"
        }, */
        {
            name: "matkat",
            path: "/trips",
        },
        {
            name: "asemat",
            path: "/stations",
        },
    ];
    return (
        <header className={styles.header}>
            <a href="/"><div className={styles.logo}>
            <Image
                src="/road.png"
                alt="bike logo"
                width={70}
                height={70}
            />
                <h3>CityBike</h3>
            </div></a>
            <nav className={styles.navigation}>
                {navLinks.map((link, index) => {
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