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

export default class ImageResults extends Component {
    state = {
        open: false,
        currentImg: '',
    }

    handleOpen = img => {
        this.setState({ open: true, currentImg: img });
    }

    handleClose = img => {
        this.setState({ open: false, currentImg: img });
    }

    onClickAction = (e) => {
        console.log(e.target);
    }

    render() {
        let imageListContent;
        const { images } = this.props;

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
                                        // checked={allExist ? true : false}
                                        // onCheck={() => this.updateCheck(img.id)}
                                        onClick={this.onClickAction}
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
        </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}