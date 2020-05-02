import React, { Component } from 'react';

class Item extends Component {
    constructor( props ) {
        super( props );

        let catched = localStorage.getItem('catched');
        if (catched) {
            catched = JSON.parse(catched);

            if (catched.indexOf(this.props.item.image) >= 0) {
                this.state = {
                    collected: true
                }
            } else {
                this.state = {
                    collected: false
                }
            }
        } else {
            this.state = {
                collected: false
            }
        }
    }

    handler(e) {
        this.setState({
            collected: e.target.checked ? true : false
        });

        let catched = localStorage.getItem('catched');

        if (catched) {
            catched = JSON.parse(catched);
        } else {
            catched = [];
        }

        if (e.target.checked) {
            catched.push(this.props.item.image);
        } else {
            for (let i = 0; i < catched.length; i++) {
                if (catched[i] == this.props.item.image) {
                    catched.splice(i, 1);
                }
            }
        }
        localStorage.setItem('catched', JSON.stringify(catched));

        return this.state.collected;
    }

    checked () {
        return this.state.collected;
    }

    render() {
        let o = false;
        if (this.props.filter != null) {
            if (this.props.item && this.props.item.months && this.props.hemisphere) {
                if (this.props.item.months[this.props.hemisphere][this.props.filter] == false) {
                    o = true;
                }
            }
        }

        return (
            <div
                className={"item" + (this.state.collected ? ' collected' : '') + (o ? ' filtered' : '')}
                onClick={() => this.props.handler(this.props.item, this.handler.bind(this), this.checked.bind(this))}
            >
                <div className="tooltip">
                    <img src={"/images/" + this.props.item.image.replace('.png', '_small.png')}/>
                    <span className="tooltiptext">{this.props.item.title}</span>
                </div>
            </div>
        );
    }
}

export default Item;