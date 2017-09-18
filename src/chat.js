import React from "react";
import { connect } from 'react-redux';
import {readComment, addNewComment} from "./actions";
import {socket} from "./socket";


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.dispatch(readComment(e.target.value));
        if (e.keyCode == 13) {
            const {first, last, id, image} = this.props.profile;
            const {comment} = this.props;
            socket.emit("addComment", {
                first, last, id, image, comment
            });
        }
    }
    render() {
        const chat = this.props.chat;
        var chatToDisplay;
        if(chat) {
            chatToDisplay = chat.map((com) => {
                let {first, last, comment, image} = com;
                return <div className = "comment"><img className ="profilePic large-pic" src={image}/>{first}: {comment}</div>;
            });
        }

        return(
            <div>
                This is where the chat will go.
                <div className ="comments">{chatToDisplay}</div>
                <textarea rows="4" cols="40" onKeyDown= {e => this.handleChange(e)}></textarea>
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
