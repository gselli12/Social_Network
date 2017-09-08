import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Logo} from './logo';
import {ProfilePic} from './profilepic';
import {PicUploader} from "./picUploader";



export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
    }
    showUploader() {
        console.log(this);
        this.setState({
            uploaderIsVisible: true
        });
    }
    closeUploader() {
        console.log("toggle");
        console.log(this);
        this.setState({
            uploaderIsVisible: false
        });
    }
    componentDidMount() {
        axios.get("/user")
            .then((data) => {
                console.log(data);
                this.setState({
                    image: "https://mypracticesn.s3.amazonaws.com/"+data.data.image,
                    first: data.data.first,
                    last: data.data.last,
                    id: data.data.id
                });
                console.log(this.state.url);
            });
    }
    uploadImage() {
        var formData = new FormData();

        formData.append('file', this.state.file),

        axios.post("/upload", formData)
            .then((resp) => {
                let data = resp.data;
                console.log(resp.data);
                if(!data.success) {
                    this.setState({
                        error: true
                    });
                } else {
                    location.replace("/");
                }
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
                <header><Logo /><ProfilePic showUploader = {this.showUploader} image = {this.state.image}/></header>
                <p>This is your app page</p>
                {this.state.uploaderIsVisible && <PicUploader uploadImage = {(e) => {this.uploadImage(e);}} handleChange = {(e) => this.handleChange(e)} closeUploader = {(e) => {this.closeUploader(e);}}/>}
            </div>
        );
    }
}
