import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Snackbar from 'material-ui/Snackbar';

export default class Image extends Component {
    state = {
        open: false,
        currentImg: '',
        Id_image: '',
        Name_image: '',
        Category_image: '',
        img_url: '',
        Active_Loading_To_DB: false,
        openSnackBar: false,
        openAlertDialog: false
    }

    handleOpen = img => {
        this.setState({
            open: true,
            currentImg: img
        });
    }

    handleClose = img => {
        this.setState({
            open: false,
            currentImg: img,
            openAlertDialog: false
        });
    }

    insertData = (img) =>
    {
        // console.log(img);
        this.setState({ Active_Loading_To_DB : true }, () =>
        {
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
                    Id_image: img.id,
                    Name_image: img.user,
                    Category_image: img.tags,
                    img_url: img.largeImageURL
                })

            })
            .then(res => res.json())
            .then(resJSON =>
            {
                this.setState({
                    Active_Loading_To_DB: false,
                    openSnackBar: true
                });
            }).catch(error =>
            {
                // console.error(error);
                this.setState({
                    Active_Loading_To_DB : false,
                    openAlertDialog: true
                });
            });
        });
    }

    removeData = (Id_image) => {

          fetch('http://localhost/React-searcher-pixabay/src/api/DB_Delete.php', {
          method: 'POST',
          headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id_image: Id_image
          })
          }).then(res => res.json())
          .then(resJSON => {
            // Showing response message coming from server after inserting records.
            console.log(resJSON);
          }).catch((error) => {
             console.error(error);
          });

    }

    render() {
        let imageListContent;
        const { images, database } = this.props;
        const db_ids = database.map(db => Number(db.Id_image)); // ids from database

        if(images) {
        imageListContent = (
            <GridList cols={4}>
                {images.map(img => (
                    <GridTile
                        title={img.tags}
                        key={img.id}
                        subtitle={
                            <span>
                                by <strong>{img.user}</strong>
                            </span>
                        }
                        actionIcon={
                            <div className="action-btns">
                                <Checkbox
                                    checked={db_ids.includes(img.id) ? true : false}
                                    onClick={() => this.insertData(img)}
                                    checkedIcon={<ActionFavorite style={{fill: 'red'}}/>}
                                    uncheckedIcon={<ActionFavoriteBorder style={{fill: 'red'}} />}
                                />
                                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            </div>
                        }
                    >
                        <img src={img.largeImageURL} alt={img.tags}/>
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
                    <img src={this.state.currentImg} alt="" style={{ width: '100%' }}/>
                </Dialog>
                <Snackbar
                    open={this.state.openSnackBar}
                    message="Picture added to your favourites"
                    autoHideDuration={4000}
                />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.openAlertDialog}
                    onRequestClose={this.handleClose}
                    contentStyle={{maxWidth: '40%'}}
                >
                    This picture is already in your favourites!
                </Dialog>
            </div>
        )
    }
}

Image.propTypes = {
    images: PropTypes.array.isRequired
}