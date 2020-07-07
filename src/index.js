import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './component/tabs';
import Modal from './component/modal';
import List from './component/list';
import Filter from './component/filter';
import data from './database.json';

require('./style.css');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            hemisphere: localStorage.getItem("hemisphere")||'north',
            filter: null
        };
    }

    openModal = (data, handler, checked) => {
        this.setState({
            isOpen: true,
            data: data,
            handler: handler,
            checked: checked
        });
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }

    switchHemisphere = (e) => {
        let hemisphere = 'north';
        if (e.target.checked) {
            hemisphere = 'south';
        }

        localStorage.setItem("hemisphere", hemisphere);

        this.setState({
            hemisphere: hemisphere
        });
    }

    onFilter = (data) => {
        this.setState({
            filter: parseInt(data)
        });
    }

    render() {
        return (
            <React.Fragment>
                <Filter
                    onFilter={this.onFilter}
                />
                <Tabs
                    hemisphere={this.switchHemisphere}
                >
                    <div label="Insects">
                        <List 
                            data={data.insects}
                            handler={this.openModal}
                            filter={this.state.filter}
                            hemisphere={this.state.hemisphere}
                        />
                    </div>
                    <div label="Fish">
                        <List 
                            data={data.fish}
                            handler={this.openModal}
                            filter={this.state.filter}
                            hemisphere={this.state.hemisphere}
                        />
                    </div>
                    <div label="Underwater">
                        <List 
                            data={data.underwater}
                            handler={this.openModal}
                            filter={this.state.filter}
                            hemisphere={this.state.hemisphere}
                        />
                    </div>
                </Tabs>
                <Modal
                    show={this.state.isOpen}
                    data={this.state.data}
                    handler={this.state.handler}
                    checked={this.state.checked}
                    hemisphere={this.state.hemisphere}
                    closeModal={this.closeModal}
                />
            </React.Fragment>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}