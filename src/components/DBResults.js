import React, { Component } from 'react'

export default class DBResults extends Component {
<<<<<<< HEAD
    constructor() {
        super();

        this.state = (
            {
                db: []
            }
        );
    }

    displayData() {
        fetch("")
    }

    render() {
        return (
        <div>

        </div>
=======
    constructor(props) {
        super(props);

        this.state = {
                db: [],
                id:'',
                name:'',
                category:''
            }
    }

    componentDidMount() {
        this.displayData();
    }

    displayData() {
        fetch("http://localhost/React-searcher-pixabay/src/api/")
            .then(res => res.json())
            .then(resJSON => {
                this.setState({
                    db: resJSON
                });
            })
    }

    addDataToDB(e) {
        e.preventDefault();
        console.log("Add data");

        const { id, name, category } = this.state;

        fetch('http://localhost/React-searcher-pixabay/src/api/DB_Add.php', {
			method: 'post',
			header:{
				// 'Accept': 'application/json',
				// 'Content-type': 'application/json'
			},
			body:JSON.stringify({
				id: id,
				name: name,
				category: category,
			})

		})
		.then(res => res.json())
			.then(resJSON =>{
				console.log(resJSON);
			})
			.catch(error => console.error(error));
    }

    render() {
        console.log(this.state.db);
        return (
            <div>
                {this.state.db.map(row => {
                    return (
                            <div key={row.Id}>{row.Name}</div>
                        )
                    }
                )}
            </div>

>>>>>>> cf075ab8b9261a3f05df215d88de8904a225f0af
        )
    }
}
