import React from 'react';
import axios from 'axios';
import {FriendButton} from './friendbutton';
import {Link, browserHistory} from 'react-router';

export class OtherPersonsProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount(newId) {
        var id;

        if(newId) {
            id = newId;
        } else {
            id = this.props.params.id;
        }

        axios.get("/api/user/"+id)
            .then((data) => {
                
                if(data.data.status == 204) {
                    browserHistory.push("/me");
                } else {
                    const {first, last, image, bio, friendshipStatus, isSender, OPPfriends} = data.data;
                    this.friendshipStatus = friendshipStatus;
                    this.isSender = isSender;
                    this.setState({
                        first,
                        last,
                        bio,
                        image,
                        OPPfriends
                    });

                }
            });
    }
    componentWillReceiveProps(nextProps) {
        this.componentWillMount(nextProps.params.id);
    }
    render() {
        let {first, last, image, bio, OPPfriends} = this.state;
        let {friendshipStatus, isSender} = this;
        let id = this.props.params.id;

        let OPPfriendsToRender;
        if(OPPfriends) {
            OPPfriendsToRender = OPPfriends.map(result => {
                let {first, last, image, id} = result;
                return <Link to={"/user/" + id}>
                    <div>
                        <img className = "profilePic large-pic" src = {image}/>
                        {first}
                    </div>
                </Link>;
            });
        }

        return(
            <div className = "profile">

                <img
                    className = "profilePic large-pic"
                    src = {image}
                />
                <div className="info-profile">
                    <p>{first}</p>
                    <p>{bio}</p>

                    {this.state.first &&
                        <FriendButton
                            id={id}
                            friendshipStatus = {friendshipStatus}
                            isSender = {isSender}
                        />
                    }

                    {friendshipStatus == "FRIENDS" &&
                    <div className="friendlist">
                        <h3>Here are {first}'s friends':</h3>
                        {OPPfriendsToRender}
                    </div>
                    }

                </div>

            </div>


        );
    }
}
