import React, { Component } from 'react';

import Image from '../components/Image';

export default class ImageResults extends Component {

    render() {
        const { images, database } = this.props;

        return (
            <Image images={images} database={database}/>
        )
    }
}