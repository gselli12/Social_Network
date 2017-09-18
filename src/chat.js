import React from "react";
import { connect } from 'react-redux';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange() {

    }
    render() {
        const chat = this.props.chat;

        var chatToDisplay;
        if(chat) {
            chatToDisplay = chat.map((com) => {
                let {first, last, comment, image} = com;
                return <div className = "comment"><img className ="profilePic large-pic" src={"https://mypracticesn.s3.amazonaws.com/" + image}/>{first}: {comment}</div>;
            });
        }

        return(
            <div>
                This is where the chat will go.
                <div className ="comments">{chatToDisplay}</div>
                <textarea rows="4" cols="40"></textarea>
            </div>
        );

    }
}

const mapStateToProps = function(state) {
    return {
        chat: state.chat
    };
};

export default connect(mapStateToProps)(Chat);
