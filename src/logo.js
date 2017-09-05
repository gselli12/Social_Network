import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Logo />,
    document.querySelector('main')
);

export function Logo() {
    return (
        <div>
            <img src="logo.png"/>
        </div>
    );
}
