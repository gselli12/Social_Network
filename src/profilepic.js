import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {PicUploader} from './picUploader.js'

export function  ProfilePic(props) {
    return (
        <img className="profilePic" onClick={
            props.showUploader
        }
        src="defaultProfilePic.jpg"/>
    );
}
