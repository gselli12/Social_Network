import React from "react";
import { connect } from 'react-redux';
import {readWallpost, submitWallpost, changeSubmitType} from "./actions.js";
import {Link} from 'react-router';


class Wallposts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submitWallpost = this.submitWallpost.bind(this);
        this.changeSubmitType = this.changeSubmitType.bind(this);
    }
    handleChange(e) {
        this.props.dispatch(readWallpost(e.target.value));
    }
    changeSubmitType(e) {
        this.props.dispatch(changeSubmitType(e.target.value));
        console.log(e.target.value);
    }
    submitWallpost(e) {

        if(e.keyCode == 13) {
            const {first, last, id, image, postWriting, submitType} = this.props;
            this.props.dispatch(submitWallpost({
                first,
                last,
                profileId: id,
                image,
                postWriting,
                submitType
            })
            );
            e.target.value = "";
        }

    }
    render() {
        var wallPostsToRender;
        if(this.props.wallPosts) {
            const {wallPosts} = this.props;
            wallPostsToRender = wallPosts.map(wallpost => {
                let {first, profile_pic, post_pic, post, timestamp, link, writer_id} = wallpost;

                if(link == "none") {
                    return <div className="wallpost"><Link to={"/user/"+writer_id}><img className="small-pic" src={profile_pic}/></Link><div>{first} at {timestamp}: <br/>  {post}</div></div> ;
                } else {
                    return <div className="wallpost">
                        <Link to={"/user/"+writer_id}><img className="small-pic" src={profile_pic}/></Link>
                        <div> {first} at {timestamp}: <br/>
                            <a target="_blank" href={link}>
                                <div className ="link-summary">
                                    {post}
                                    <img className = "link-pic" src={post_pic}/>
                                </div>
                            </a>
                        </div>
                    </div>;
                }
            });
        }

        return (
            <div className="wallposts-div">
                <h3>{this.props.first}'s wall</h3>
                <div className="input-wallpost">
                    <select onChange = {this.changeSubmitType}>
                        <option value="text">Text</option>
                        <option value="link">Link</option>
                    </select>
                    <textarea rows="4" cols="90" onKeyDown= {this.submitWallpost} onChange= {this.handleChange}></textarea>
                </div>
                <div className = "wallposts">{wallPostsToRender}</div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        postWriting: state.postWriting,
        submitType: state.submitType
    };
};

export default connect(mapStateToProps)(Wallposts);
