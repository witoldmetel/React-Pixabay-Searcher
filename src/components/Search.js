import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

import ImageResults from '../components/ImageResults';

export default class componentName extends Component {
    state = {
        searchText: '',
        amount: 20,
        apiRootUrl: 'https://pixabay.com/api',
        apiKey: '9002807-4a05d124b2172ea760f7564cc',
        images: []
    }

    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
        if (val === '') {
            this.setState({ images: [] });
        } else {
            axios.get(`${this.state.apiRootUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({ images: res.data.hits }))
                .catch(err => console.log(err));
            }
        });
    }

    onAmountChange = (e, index, value) => this.setState({amount: value})

    render() {
        console.log(this.state.images);
        return (
        <div>
            <TextField
                name="searchText"
                value={this.state.searchText}
                onChange={this.onTextChange}
                floatingLabelText="Search For Images"
                fullWidth={true}
            />
            <hr/>
            <SelectField
                name="amount"
                floatingLabelText="Amount"
                value={this.state.amount}
                onChange={this.onAmountChange}
                >
                <MenuItem value={5} primaryText="5" />
                <MenuItem value={10} primaryText="10" />
                <MenuItem value={20} primaryText="20" />
                <MenuItem value={35} primaryText="35" />
                <MenuItem value={50} primaryText="50" />
            </SelectField>
        </div>
        )
    }
}
