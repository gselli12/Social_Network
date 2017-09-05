import React from 'react';
import axios from 'axios';


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    submit() {
        axios.post('/register', {
            first: this.state.firstName,
            last: this.state.lastName,
            email: this.state.email,
            pw: this.state.pw
        }).then(resp => {

            const data = resp.data;
            console.log("data", data);

            if (!data.success) {
                this.setState({
                    error: true
                });
            } else {
                location.replace("/");
            }
        });
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">YOU MESSED UP</div>}
                <input name="firstName" placeholder='First Name' onChange= {this.handleChange}/>
                <input name="lastName" placeholder='Last Name' onChange= {this.handleChange}/>
                <input name="email" placeholder='Email' onChange= {this.handleChange}/>
                <input name="pw"  type="password" placeholder='Password' onChange= {this.handleChange}/>
                <button onClick={ e => this.submit()}>Register</button>
            </div>
        );
    }
}
