import React from "react";
import { Link } from "react-router-dom";
import githubLogo from "./images/githubLogo.png"

const Footer = () => {
    return (
        <footer className="footer-container">
            <ul>
                <li><p>© 2023 PokeSearch, LLC</p></li>
                <li><Link to="/cards">Cards</Link></li>
                <li><Link>About</Link></li>
                <li><a href = "mailto: admin@pokemonshopper.com">Contact Us</a></li>
                <li><a href="https://github.com/CharizardsBlaze/Pokemon-Shopper"><img id="github-logo" src={githubLogo}></img></a></li>
            </ul>
        </footer>
    )
}

export default Footer;