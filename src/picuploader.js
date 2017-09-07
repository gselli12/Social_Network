import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';

export function PicUploader() {

    // handleChange(e) {
    //     this[e.target.name] = e.target.value;
    // }
    // setImage() {
    //     console.log("submitting this", this);
    //     axios.post("/upload", {
    //         image: this.image
    //     })
    //         .then((resp) => {
    //             console.log(resp.data);
    //         });
    // }

    return (
        <div className="shadow">
            <div className = "uploadProfilePic">
                <input name="image" type="file"/>
                <button onclick={() => {
                    console.log("click");
                    this.setImage;
                }} >Upload</button>
            </div>
        </div>
    );


}
