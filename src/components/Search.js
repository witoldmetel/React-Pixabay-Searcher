import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

export default class componentName extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiRootUrl: 'https://pixabay.com/api',
        apiKey: '9002807-4a05d124b2172ea760f7564cc',
        images: []
    }

    render() {
        return (
        <div>
            <TextField
                name="searchText"
                value={this.state.searchText}
                onChange={this.onTextChange}
                floatingLabelText="Search For Images"
                fullWidth={true}
            />
            <SelectField />
        </div>
        )
    }
}
