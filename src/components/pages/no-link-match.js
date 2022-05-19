import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
        return (
            <div>
                <h2>Sorry, this page doesn't exist!</h2>
                <Link exact to="/">Return to Home</Link>
            </div>
        );
}