// Modal.js
import React, { Component } from 'react';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

class Modal extends Component {
    check(e) {
        this.setState({
            checked: e.target.checked ? true : false
        });
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        this.state = {
            checked: this.props.checked()
        };

        return (
            <div className="overlay">
                <div className="modal">
                    <a className="close" onClick={this.props.closeModal}></a>
                    <div className="image">
                        <div className="title"><div className="b">{this.props.data.title}</div></div>
                        <div className="clear"></div>
                        <img src={'/images/' + this.props.data.image}/>
                        <div className="switch-container">
                            <span className="tit">Catched</span>
                            <label className="switch">
                                <input type="checkbox" checked={this.state.checked} onChange={(e) => {this.props.handler(e); this.check(e)}}/>
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="time">
                        <span className="tit">Active Hours</span><br/>
                        {this.props.data.when[this.props.hemisphere]}
                    </div>
                    <div className="season">
                        <span className="tit">Seasonality</span>
                        <div className="cal">
                            {months.map((month, i) => {
                                let classname = (this.props.data.months[this.props.hemisphere][i] ? 'fill' : '') + (i == new Date().getMonth() ? ' cur' : '');
                                return (
                                    <div className={classname} key={month}>{month}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="location">
                        <span className="tit">Location</span> {this.props.data.spawn}
                        {this.props.data.size && (
                            <div>
                                <span className="tit">Size</span>{this.props.data.size}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default Modal;