import React, { Component } from 'react'
import './styles.css';
import axios from 'axios';
import SearchResults from './searchResults';

export class SearchField extends Component{

    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
            results: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    //Handles when fields in the input are changed
    handleChange(event) {
        this.setState({searchString: event.target.value})
    }
    async handleSubmit(event)
    {
        event.preventDefault();
        let restaurants = await axios.get('/restaurants/search_results', {
            params: {
              queryString: this.state.searchString
            }
          });
        console.log(this.state.searchString);
        this.setState({results: restaurants})
        console.log(this.state.results);
    }

    render() {
        return(
        <div className="search-container">
            <form onSubmit={this.handleSubmit}> 
                <input 
                    name="searchString"
                    type="text"
                    placeholder="Search by location, restaurants, price..."
                    required={true}
                    onChange={this.handleChange}
                />
                <input
                    name="search"
                    type="submit"
                    value="Search"
                />
            </form>
        </div>
        )
    }
}
export default SearchField