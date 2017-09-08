import React from 'react';
import axios from 'axios';

export function Bio({bio, editBioIsVisible, showEditBio, readInput}) {
    return(
        <div>
            {bio ?  bio : <p onClick = {showEditBio}>Edit your bio here</p>}
            {editBioIsVisible && <div><textarea rows="4" cols="50" onChange = {readInput}/> <button>Save</button></div>}
        </div>
    );
}
