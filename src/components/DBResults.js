import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class DBResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
                db: [],
                Id_image: '',
                Name_image:'',
                Category_image: '',
                img_url: '',
                Active_Loading_To_DB: false
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

    insertData = () =>
    {
        this.setState({ Active_Loading_To_DB : true }, () =>
        {
            const { Id_image, Name_image, Category_image, img_url } = this.state;

            fetch('http://localhost/React-searcher-pixabay/src/api/DB_Add.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    Id_image: Id_image,
                    Name_image: Name_image,
                    Category_image: Category_image,
                    img_url: img_url
                })

            })
            .then(res => res.json())
            .then(resJSON =>
            {
                alert(resJSON);
                this.setState({ Active_Loading_To_DB : false });

            }).catch(error =>
            {
                console.error(error);
                this.setState({ Active_Loading_To_DB : false});
            });
        });
    }

    onTextChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(name, value);
    }

    render() {
        // console.log(this.state.db);
        return (
            <div>
                {this.state.db.map(row => {
                    return (
                            <div key={row.Id_image}>{row.Name_image}</div>
                        )
                    }
                )}
                <div className="container">
                    <TextField
                        name="Id_image"
                        value={this.state.Id_image}
                        onChange={this.onTextChange}
                        floatingLabelText="add id"
                    />
                    <TextField
                        name="Name_image"
                        value={this.state.Name_image}
                        onChange={this.onTextChange}
                        floatingLabelText="add name"
                    />
                    <TextField
                        name="Category_image"
                        value={this.state.Category_image}
                        onChange={this.onTextChange}
                        floatingLabelText="add category"
                    />
                    <TextField
                        name="img_url"
                        value={this.state.img_url}
                        onChange={this.onTextChange}
                        floatingLabelText="add img url"
                    />
                </div>
            </div>
        )
    }
}
