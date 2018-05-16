import React, { Component } from 'react'

export default class DBResults extends Component {
    constructor() {
        super();

        this.state = (
            {
                db: []
            }
        );
        this.displayData();
    }

    displayData() {
        fetch("http://localhost/React-searcher-pixabay/src/api/")
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    db: resJSON
                });
                console.log(this.state.db);
            })
    }

    render() {
        return (
        <div>
            works smomething?
        </div>
        )
    }
}
