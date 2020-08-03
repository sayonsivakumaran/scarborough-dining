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
        <>
        <div className="search-container">
            <form> 
                <input 
                    name="searchString"
                    type="text"
                    placeholder="Search by location, restaurants, price..."
                    required={true}
                    onChange={this.handleChange}
                />
                <Link to="/search_results">
                <input
                    name="search"
                    type="submit"
                    value="Search"
                    />
                </Link>
            </form>
        </div>
        <Switch>
            <Route path="/search_results" render={
                () => <SearchResults query={this.state.searchString} />
              } />
        </Switch>
        </>
        )
    }
}
export default SearchField