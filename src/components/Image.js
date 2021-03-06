import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  GridList,
  GridTile,
  IconButton,
  Dialog,
  FlatButton,
  Checkbox,
  Snackbar
} from "material-ui";
import {
  ZoomIn,
  ActionFavorite,
  ActionFavoriteBorder
} from "material-ui/svg-icons";

class Image extends Component {
  state = {
    open: false,
    currentImg: "",
    Id_image: "",
    Name_image: "",
    Category_image: "",
    img_url: "",
    openSnackBar: false,
    openAlertDialog: false,
    disableAdd: false
  };

  handleOpen = img => {
    this.setState({
      open: true,
      currentImg: img
    });
  };

  handleClose = img => {
    this.setState({
      open: false,
      currentImg: img,
      openAlertDialog: false
    });
  };

  insertData = img => {
    this.setState(() => {
      fetch("http://localhost/React-searcher-pixabay/src/api/DB_Add.php", {
        method: "POST",
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_image: img.id,
          Name_image: img.user,
          Category_image: img.tags,
          img_url: img.largeImageURL
        })
      })
        .then(res => res.json())
        .then(resJSON => {
          this.setState({
            openSnackBar: true,
            disableAdd: true
          });
          setTimeout(() => this.props.history.push("/dbresults"), 1500);
        })
        .catch(error => {
          this.setState({
            openAlertDialog: true
          });
        });
    });
  };

  render() {
    let imageListContent;
    const { images, database } = this.props;
    const db_ids = database.map(db => Number(db.Id_image)); // ids from database

    if (images) {
      imageListContent = (
        <GridList cols={4} style={{ margin: "0px" }}>
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
                    disabled={this.state.disableAdd ? true : false}
                    checkedIcon={<ActionFavorite style={{ fill: "red" }} />}
                    uncheckedIcon={
                      <ActionFavoriteBorder style={{ fill: "red" }} />
                    }
                  />
                  <IconButton
                    onClick={() => this.handleOpen(img.largeImageURL)}
                  >
                    <ZoomIn color="white" />
                  </IconButton>
                </div>
              }
            >
              <img src={img.largeImageURL} alt={img.tags} />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
        </Dialog>
        <Snackbar
          open={this.state.openSnackBar}
          message="Picture added to your favourites"
          autoHideDuration={1000}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.openAlertDialog}
          onRequestClose={this.handleClose}
          contentStyle={{ maxWidth: "40%" }}
        >
          This picture is already in your favourites!
        </Dialog>
      </div>
    );
  }
}

Image.propTypes = {
  images: PropTypes.array.isRequired
};

export default withRouter(Image);
