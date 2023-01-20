import React from "react";
import waving from "./images/waving_pikachu_by_omegablaziken104-dbrub2r.webp"

const About = () => {
    return (
        <div className="container about">
            <p>PokeSearch, LLC is a Pokémon Card buying and selling website created in January of 2023.</p>
            <p>It it headquarterd in Denver, CO; and Alexandria, LA.</p>
            <p>The <b>Denver</b> office is located at </p>
            <img className="waving" src={waving} />
            <div className="address">
                <p>Pewter City Museum, Office No. 487</p>
                <p>3937 West Colfax Ave</p>
                <p>Denver, CO</p>
                <p>80204</p>
            </div>
            <p>You can reach the Denver office at (970) 250-1105</p>
            <p>The <b>Alexandria</b> office is located at </p>

            <div className="address">
                <p>Kanto Office Suite, Second Floor</p>
                <p>1635 Creswell Lane</p>
                <p>Opelousas, LA</p>
                <p>70570</p>
            </div>
            <p>You can reach the Alexandria office at (318) 276-3133</p>
            <p>It was created by Justin Syrett, Jaron Chretien, Pierce Babineaux, and Marcus Moritz.</p>
            <p>You may not contact them.</p>
        </div>
    )
}

export default About;