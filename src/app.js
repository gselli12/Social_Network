import React from 'react';
import axios from './axios';
import {Logo} from './logo';
import {ProfilePic} from './profilepic';
import {PicUploader} from "./picUploader";



export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.showEditBio = this.showEditBio.bind(this);
        this.readInput = this.readInput.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    closeUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    showEditBio() {
        this.setState({
            editBioIsVisible: true
        });
    }
    componentDidMount() {
        axios.get("/api/user")
            .then((data) => {
                const {first, last, id, bio} = data.data;
                this.setState({
                    image: "https://mypracticesn.s3.amazonaws.com/"+data.data.image,
                    first,
                    last,
                    id,
                    bio
                });
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
    updateBio() {
        let {textareaBio} = this.state;

        axios.post("/bio", {
            bio: textareaBio
        });

        this.setState({
            bio: textareaBio,
            editBioIsVisible: false
        });

    }
    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });

    }
    readInput(e) {
        this.setState({
            textareaBio : e.target.value
        });
    }
    render() {
        const {id, image, first, last, bio, editBioIsVisible} = this.state;
        const children = React.cloneElement(this.props.children, {
            profile : {
                id,
                image,
                first,
                last,
                bio,
                editBioIsVisible,
                showEditBio: this.showEditBio,
                readInput: this.readInput,
                updateBio: this.updateBio
            }
        });

        return(
            <div>
                <header><Logo />
                    <ProfilePic
                        showUploader = {this.showUploader}
                        image = {this.state.image}
                    />
                </header>

                {children}

                {this.state.uploaderIsVisible &&
                    <PicUploader
                        uploadImage = {(e) => {this.uploadImage(e);}}
                        handleChange = {(e) => this.handleChange(e)}
                        closeUploader = {(e) => {this.closeUploader(e);}}
                    />
                }
            </div>
        );
    }
}
