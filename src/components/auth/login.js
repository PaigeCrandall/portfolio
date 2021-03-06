import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleLoginSubmit(event) {
        axios.post("https://api.devcamp.space/sessions", 
        {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created') {
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    errorText: "Incorrect email or password"
                });
                this.props.handleUnsuccessfulAuth();
            }
        }).catch(error => {
            this.setState({
                errorText: "An error occured"
            });
            this.props.handleUnsuccessfulAuth();
        });

        event.preventDefault();
    }

    render() {
        return (
            <div className="login-page">
                <h2 className="layout-heading">Login to Access your Dashboard:</h2>

                <form className="auth-form" onSubmit={this.handleLoginSubmit}>
                    <div className="form-group">
                        <FontAwesomeIcon icon="paper-plane" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                        <button type="submit" className="btn-long">Login</button>
                </form>
                <div className="auth-error-text">{this.state.errorText}</div>
            </div>
        );
    }
}