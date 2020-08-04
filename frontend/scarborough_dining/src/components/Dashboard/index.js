import React, { Component } from 'react'
import { Switch, Route, Link} from 'react-router-dom';
import axios from 'axios'

export class Dashboard extends Component {

    state = {
        displayName: ""
    }
    
    componentDidMount() {
        axios.get('/auth/login/success')
            .then(results => this.setState({
                displayName: results.data.user.displayName
            })
        )
    }

    render() {
        return (
            <div>
                <p>H</p>
                <p>H</p>
                <p>H</p>
                <p>H</p>
                <h1>You are Logged In as {this.state.displayName}</h1>
                <Link to='/account-creation/user'>Change Account Information</Link>
            </div>
        )
    }
}

export default Dashboard
