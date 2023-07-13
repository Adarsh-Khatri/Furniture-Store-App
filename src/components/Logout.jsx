import React, { Component } from 'react';
import { removeUser } from '../services/authServices';


export default class Logout extends Component {

    componentDidMount() {
        removeUser();
        this.props.history.push("/")
    }

    render() {
        return ("")
    }
}
