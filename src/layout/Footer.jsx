import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer>
            <section>
                <div>
                    <div> 
                        <p> © 2021 Eastpoint Software Ltd. </p>
                        <p>A private limited company incorporated in England and Wales under company number 07814575.</p>
                    </div>

                    <div>
                        <ul>
                            <li>
                                @EastpointS
                            </li>
                            <li>
                                <a href="tel:01223690164">01223 690164</a>
                            </li>
                            <li>
                                <a to="https://www.eastpoint.co.uk/"><u>info@eastpoint.co.uk</u></a>
                            </li>
                    
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <li>
                                Unit 23, Innovation Centre
                            </li>
                            <li>
                                Cambridge Science Park
                            </li>
                            <li>
                                Cambridge, CB4 0WG
                            </li>

                        </ul>
                        </div>
                </div>
            </section>
        </footer>
    );
}