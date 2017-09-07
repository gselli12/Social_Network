import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Logo} from './logo';
import {ProfilePic} from './profilepic';



export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
    }
    showUploader() {

        this.setState({
            uploaderIsVisible: true
        });
    }
    uploadImage() {
        var formData = new FormData();

        formData.append('file', this.state.file),
        
        axios.post("/upload", formData)
            .then((resp) => {
                console.log("successful request");
                console.log(resp.data);
            });
    }
    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
        console.log("change", e.target.files[0]);
    }
    render() {
        return(
            <div>
                <header><Logo /><ProfilePic showUploader = {this.showUploader} /></header>
                <p>This is your app page</p>
                {this.state.uploaderIsVisible && <PicUploader uploadImage = {(e) => {this.uploadImage(e);}} handleChange = {(e) => this.handleChange(e)}/>}
            </div>
        );
    }
}

export function PicUploader({handleChange, uploadImage}) {
    return (
        <div className="shadow">
            <div className = "uploadProfilePic">
                <input name="image" type="file" onChange = {handleChange}/>
                <button onClick={
                    uploadImage
                } >Upload</button>
            </div>
        </div>
    );
}
