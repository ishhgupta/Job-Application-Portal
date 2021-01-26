import React, {Component} from 'react';
import axios from 'axios';
import ls from "local-storage";

// var string = "MyString"

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {
        this.setState({
            name: 'Vikrant'
        })
    }

    componentDidUpdate() {
        if(this.state.name != 'Kanish')
        this.setState({
            name: 'Kanish'
        })
    }

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>
                <h3> 
                Hello {ls.get("username")}. You are a {ls.get("userType")}
                </h3>
                {/* Happy Coding {this.state.name}! */}
                {/* {ls.get("username")} */}
           </div>

        )
    }
}