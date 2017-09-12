import React from 'react';
import axios from 'axios';

export function PicUploader({handleChange, uploadImage, closeUploader}) {
    return (
        <div className="shadow">
            <div className = "uploadProfilePic">
                <img src="close.png" onClick={closeUploader} className = "close-modal"/>
                <input name="image" type="file" onChange = {handleChange}/>
                <button onClick={uploadImage} >Upload</button>
            </div>
        </div>
    );
}
