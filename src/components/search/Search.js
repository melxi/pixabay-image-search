import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiURL: "https://pixabay.com/api",
    apiKey: "12651516-4892743586e28c937f3c6473f",
    images: []
  };

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      axios
        .get(
          `${this.state.apiURL}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image-type=photo&per_page=${this.state.amount}&safesearch=true`
        )
        .then(res =>
          this.setState({
            images: res.data.hits
          })
        )
        .catch(err => console.log(err));
    });
  };

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
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
      </div>
    );
  }
}

export default Search;
