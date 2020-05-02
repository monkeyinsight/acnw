import React, { Component } from 'react';
import Item from './item';

class List extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            showModal: false
        }
    }

    render() {
        return (
            <div className="table">
                {this.props.data.map((child) => {
                    return (
                        <Item
                            key={child.image}
                            item={child}
                            handler={this.props.handler}
                            filter={this.props.filter}
                            hemisphere={this.props.hemisphere}
                        />
                    );
                })}
            </div>
        );
    }
}

export default List;