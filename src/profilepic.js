import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';

export function  ProfilePic({showUploader, image}) {
    return (
        <div><img className="profilePic" onClick = {showUploader}
            src={image}/></div>
    );
}
