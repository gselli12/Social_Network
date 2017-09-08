import React from 'react';
import axios from './axios';
import {Link} from 'react-router';

export function Welcome(props) {
    return (
        <div>
            <h2>Welcome to</h2>
            <img src="logo.png"/>
            <h3>We are rebelling becasue all the other online communities are revolting.</h3>
            <h4>Join the rebellion!</h4>
            {props.children}
        </div>
    );
}

export let Login = wrapInAuthForm(LoginForm, "/login");

export let Register = wrapInAuthForm(RegistrationForm, "/register");


function wrapInAuthForm(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
            this.url = url;
        }
        handleChange(e) {
            this[e.target.name] = e.target.value;
        }
        submit() {
            console.log(this);
            let {firstName, lastName, email, pw} = this;

            axios.post( url, {
                first: firstName,
                last: lastName,
                email: email,
                pw: pw
            }).then((resp) => {

                const data = resp.data;

                if (!data.success) {
                    this.setState({
                        error: true
                    });
                } else {
                    location.replace("/");
                }
            });
        }
        render() {
            return <Component error={this.state.error}
                handleChange={(e) => this.handleChange(e)}
                submit= {(e) => this.submit(e)} />;
        }
    };
}

function LoginForm({handleChange, submit, error}) {
    return (
        <div>
            {error && <div className="error">YOU MESSED UP</div>}
            <input name="email" placeholder='Email' onChange= {handleChange}/>
            <input name="pw"  type="password" placeholder='Password' onChange= {handleChange}/>
            <button onClick={submit}>Log In</button>
            <p>Not a member yet? <Link to={"/"}>Register</Link></p>
        </div>
    );
}

function RegistrationForm({handleChange, submit, error}) {
    return (
        <div>
            {error && <div className="error">YOU MESSED UP</div>}
            <input name="firstName" placeholder='First Name' onChange= {handleChange}/>
            <input name="lastName" placeholder='Last Name' onChange= {handleChange}/>
            <input name="email" placeholder='Email' onChange= {handleChange}/>
            <input name="pw"  type="password" placeholder='Password' onChange= {handleChange}/>
            <button onClick={submit}>Register</button>
            <p>Already a member? <Link to={"/login"}>Login</Link></p>
        </div>
    );
}


// export function Welcome(props) {
//     return (
//         <div>
//             <h2>Welcome to</h2>
//             <img src="logo.png"/>
//             <h3>We are rebelling becasue all the other online communities are revolting.</h3>
//             <h4>Join the rebellion!</h4>
//             {props.children}
//         </div>
//     );
// }
//
// export class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.handleChange = this.handleChange.bind(this);
//     }
//     submit() {
//         axios.post('/register', {
//             first: this.state.firstName,
//             last: this.state.lastName,
//             email: this.state.email,
//             pw: this.state.pw
//         }).then(resp => {
//
//             const data = resp.data;
//             console.log("data", data);
//
//             if (!data.success) {
//                 this.setState({
//                     error: true
//                 });
//             } else {
//                 location.replace("/");
//             }
//         });
//     }
//     handleChange(e) {
//         this[e.target.name] = e.target.value;
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.error && <div className="error">YOU MESSED UP</div>}
//                 <input name="firstName" placeholder='First Name' onChange= {this.handleChange}/>
//                 <input name="lastName" placeholder='Last Name' onChange= {this.handleChange}/>
//                 <input name="email" placeholder='Email' onChange= {this.handleChange}/>
//                 <input name="pw"  type="password" placeholder='Password' onChange= {this.handleChange}/>
//                 <button onClick={ e => this.submit()}>Register</button>
//                 <p>Already a member? <Link to={"/login"}>Login</Link></p>
//             </div>
//         );
//     }
// }
//
// export class Login extends React.Component  {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.handleChange = this.handleChange.bind(this);
//     }
//     submit() {
//         axios.post('/login', {
//             email: this.state.email,
//             pw: this.state.pw
//         }).then((resp) => {
//             const data = resp.data;
//             console.log("data", data);
//
//             if(!data.success) {
//                 this.setState({
//                     error: true
//                 });
//             } else {
//                 location.replace("/");
//             }
//         });
//     }
//     handleChange(e) {
//         this[e.target.name] = e.target.value;
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.error && <div className="error">YOU MESSED UP</div>}
//                 <input name="email" placeholder='Email' onChange= {this.handleChange}/>
//                 <input name="pw"  type="password" placeholder='Password' onChange= {this.handleChange}/>
//                 <button onClick={ e => this.submit()}>Log In</button>
//                 <p>Not a member yet? <Link to={"/"}>Register</Link></p>
//             </div>
//         );
//     }
// }
