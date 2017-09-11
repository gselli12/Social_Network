import React from 'react';

export function Bio({bio, editBioIsVisible, showEditBio, readInput, updateBio}) {
    return(
        <div>
            {bio ?  bio : <p onClick = {showEditBio}>Add your bio</p>}
            {bio && !editBioIsVisible && <p onClick = {showEditBio}>Edit your bio</p>}
            {editBioIsVisible && <div><textarea rows="4" cols="50" onChange = {readInput}/> <button onClick = {updateBio}>Save</button></div>}
        </div>
    );
}
