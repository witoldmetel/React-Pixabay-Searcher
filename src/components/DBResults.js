import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

export default class DBResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
                db: [],
                Id_image: '',
                Name_image:'',
                Category_image: '',
                img_url: '',
                Active_Loading_To_DB: false,
                open: false
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

    handleOpen = img => {
        this.setState({ open: true, img_url: img });
    }

    handleClose = img => {
        this.setState({ open: false, img_url: img });
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
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
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
        let imageListContent;

        if(this.state.db) {
            imageListContent = (
                <GridList cols={4}>
                    {this.state.db.map(img => (
                        <GridTile
                            className = "dbresults-image"
                            title={img.Category_image}
                            key={img.Id_image}
                            subtitle={
                                <span>
                                    by: <strong>{img.Name_image}</strong>
                                </span>
                            }
                            actionIcon={
                                <div className="action-btns">
                                    <Checkbox
                                        // checked={allExist ? true : false}
                                        // onCheck={() => this.updateCheck(img.id)}
                                        checkedIcon={<ActionFavorite style={{fill: 'red'}}/>}
                                        uncheckedIcon={<ActionFavoriteBorder style={{fill: 'red'}} />}
                                    />
                                    <IconButton onClick={() => this.handleOpen(img.img_url)}>
                                        <ZoomIn color="white" />
                                    </IconButton>
                                </div>
                            }
                        >
                            <img src={img.img_url} alt={img.Name_image}/>
                        </GridTile>
                    ))}
                </GridList>
            )
        } else {
            imageListContent = null;
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]

        return (
            <div>
                {imageListContent}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <img src={this.state.img_url} alt="" style={{ width: '100%' }}/>
                </Dialog>
            </div>
        )
    }
}
