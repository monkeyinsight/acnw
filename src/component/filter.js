import React, { Component } from 'react';
import PropTypes from 'prop-types';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

class Filter extends Component {
    static propTypes = {
        onFilter: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            filter: null
        };
    }

    handle(e) {
        let sel = e.target.getAttribute('data-key');

        if (this.state.filter === sel) {
            sel = null;
        }

        this.setState({
            filter: sel
        });

        this.props.onFilter(sel);
    }

    render() {
        return (
            <div className="filter">
                {months.map((month, i) => {
                    return (
                        <div
                            className={this.state.filter === i ? 'sel' : ''}
                            key={month}
                            data-key={i}
                            onClick={(e) => this.handle(e)}
                        >
                            {month}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Filter;