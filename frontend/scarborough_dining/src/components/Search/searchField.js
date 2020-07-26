import React, { Component } from 'react'
import './styles.css';
import axios from 'axios';

export class SearchField extends Component{

    constructor(props) {
        super(props)
        this.state = {
            searchString: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event)
    {
        event.preventDefault();
        let results = await axios.get('/restaurants/search_results', {
            params: {
              queryString: this.state.searchString
            }
          });
        console.log(results);
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
                    className="inputStyle"
                    //onChange={this.handleChange}
                />
                <input
                    name="search"
                    type="submit"
                    value="Search"
                    //className="inputStyle"
                />
            </form>
        </div>
        )
    }

}