import React, { Component } from 'react'
import Restaurant from '../Restaurant'
import '../Restaurant/styles.css'
import axios from 'axios';
export class SearchResults extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            results: []
        }
        //this.getResults = this.getResults.bind(this);
        this.getResults();
    }

    getResults()
    {
        axios.get('/restaurants/search_results', {
            params: {
                queryString: this.props.query
              }
          }).then(response => {
            this.setState({
                results: response.data
            });
        })

    }
    render() {
        return (
            <React.Fragment>
                <div className="restaurants">
                <h2 className="restaurant-list-title mb-4 font-weight-bold">Search Results</h2>
                    <div className="card-columns">
                        {
                            this.state.results.map(restaurant => {
                                return <Restaurant key={restaurant._id} restaurant={restaurant} />
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SearchResults