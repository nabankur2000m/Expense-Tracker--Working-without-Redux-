import React from 'react';

function Header() {

    const email = localStorage.getItem('email');
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    {email && <li style={{ float: 'right' }}>{email}</li>}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
