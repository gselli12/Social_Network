import React from "react";
import { connect } from 'react-redux';
import {readComment, addNewComment} from "./actions";
import {socket} from "./socket";


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }
    handleChange(e) {
        this.props.dispatch(readComment(e.target.value));
    }
    submitComment(e) {
        if (e.keyCode == 13) {
            const {first, last, id, image} = this.props.profile;
            const {comment} = this.props;
            e.target.value = "";
            socket.emit("addComment", {
                first, last, id, image, comment
            });
        }
    }
    componentDidUpdate() {
        this.chatDiv.scrollTop = this.chatDiv.scrollHeight;
    }
    render() {
        const chat = this.props.chat;
        var chatToDisplay;
        if(chat) {
            chatToDisplay = chat.map((com) => {
                let {first, last, comment, image, timestamp} = com;
                return <div className = "comment"><img className ="profilePic large-pic" src={image}/>{first}: {comment} at {timestamp}</div>;
            });
        }

        return(
            <div>
                <h3>Chat</h3>
                <div className ="chat" ref={chatDiv => this.chatDiv = chatDiv}>
                    <div className ="comments">{chatToDisplay}</div>
                </div>
                <textarea rows="5" cols="60" onKeyDown= {this.submitComment} onChange= {this.handleChange}></textarea>
            </div>
        );

    }
}

const mapStateToProps = function(state) {
    return {
        chat: state.chat,
        comment: state.comment
    };
};

export default connect(mapStateToProps)(Chat);
