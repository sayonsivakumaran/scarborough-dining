import React, { Component } from 'react'
import './styles.css';

export class SearchField extends Component{

    render() {
        return(
        <div className="search-container">
            <form>
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