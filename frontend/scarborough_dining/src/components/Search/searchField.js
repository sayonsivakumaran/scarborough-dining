import React, { Component } from 'react'
import './styles.css';
import {Link} from 'react-router-dom';

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
                    onChange={this.handleChange}
                    className="format"
                />
                <Link to={`/search_results/${this.state.searchString}`}>
                <input
                    name="search"
                    type="submit"
                    value="Search"
                    className="format"
                />
                </Link>
            </form>
        </div>
        )
    }
}
export default SearchField