import React from 'react';
import axios from './axios';
import {ProfilePic} from './profilepic';
import {FriendButton} from './friendbutton';
import {Link, browserHistory} from 'react-router';
import Wallposts from "./wallpost";

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
                    const {first, last, image, bio, friendshipStatus, isSender, OPPfriends, wallPosts} = data.data;
                    this.friendshipStatus = friendshipStatus;
                    this.isSender = isSender;
                    this.setState({
                        first,
                        last,
                        bio,
                        image,
                        OPPfriends,
                        wallPosts
                    });

                }
            });
    }
    componentWillReceiveProps(nextProps) {
        this.componentWillMount(nextProps.params.id);
    }
    render() {
        let {first, last, image, bio, OPPfriends, wallPosts} = this.state;
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

        let wallpostsToRender = <Wallposts first={first} last={last} image={image} id={id} wallPosts={wallPosts}/>;

        return(
            <div>
                <div className = "profile">

                    <div className = "large-pic" style={{left: "20%"}}><ProfilePic image = {image} /></div>
                    <div className="info-profile" style={{marginLeft: "20%"}}>
                        <p>{first}</p>
                        <p>{bio}</p>

                        {this.state.first &&
                        <FriendButton
                            id={id}
                            friendshipStatus = {friendshipStatus}
                            isSender = {isSender}
                        />
                        }

                    </div>
                </div>


                {friendshipStatus == "FRIENDS" &&
                    <div>

                        <div className="wallposts-opp">{wallpostsToRender}</div>

                        <div className="friendlist">
                            <h3>Here are {first}'s friends':</h3>
                            {OPPfriendsToRender}
                        </div>
                    </div>
                }
            </div>






        );
    }
}
