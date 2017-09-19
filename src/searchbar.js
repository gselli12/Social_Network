import React from "react";
import { connect } from 'react-redux';
import {getSearchResults, clearSearchbar} from "./actions";
import {Link} from 'react-router';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.clearSearchbar = this.clearSearchbar.bind(this);
    }
    handleChange(e) {
        this.props.dispatch(getSearchResults(e.target.value));
    }
    clearSearchbar() {
        this.props.dispatch(clearSearchbar());
    }
    render() {
        const searchResults = this.props.searchResults;
        console.log(searchResults);
        let resultsToDisplay;
        if(searchResults) {
            resultsToDisplay = searchResults.map((result) => {
                let {first, last, image, id} = result;
                return <Link to={"/user/" + id} onClick = {this.clearSearchbar}>
                    <div>
                        <img className = "user-search-image" src={image}/>
                        {first}
                    </div>
                </Link>;
            });
        }
        return (
            <div className="searchbar">
                <textarea  rows= "2" cols = "30" onChange= {this.handleChange}></textarea>
                <div className="user-search-results">{resultsToDisplay}</div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        searchResults: state.searchResults
    };
};

export default connect(mapStateToProps)(Searchbar);
