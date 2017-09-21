import React from 'react';
import {Link} from 'react-router';

export function  ProfilePic({showUploader, image}) {
    return (
        <img className="profilePic" onClick = {showUploader}
            src={image}/>
    );
}
