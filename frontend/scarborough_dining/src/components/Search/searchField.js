import React, { Component } from 'react'
import './styles.css';
import SearchResults from './searchResults';
import {Route, Link, Switch} from 'react-router-dom';
import RestaurantList from '../RestaurantList';

export class SearchField extends Component{

    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    //Handles when fields in the input are changed
    handleChange(event) {
        this.setState({searchString: event.target.value})
    }

    render() {
        return(
        <div className="search-container">
            <form className="border"> 
                <input 
                    name="searchString"
                    type="text"
                    placeholder="Search by restaurants, location..."
                    required={true}
                    onChange={this.handleChange}
                />
                <Link to={`/search_results/${this.state.searchString}`}>
                <input
                    name="search"
                    type="submit"
                    value="Search"
                    />
                </Link>
            </form>
        </div>
        )
    }
}
export default SearchField