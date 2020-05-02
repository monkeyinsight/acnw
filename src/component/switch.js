import React, { Component } from 'react';

class Switch extends Component {
    getHemisphere() {
        return localStorage.getItem("hemisphere") == 'south';
    }

    render() {
        return (
            <div className="hemisphere">
                <span>North</span>
                <label className="switch">
                    <input type="checkbox" defaultChecked={this.getHemisphere()} onChange={(e) => this.props.handler(e)}/>
                    <span className="slider"></span>
                </label>
                <span>South</span>
            </div>
        );
    }
}

export default Switch;