import React from 'react'

class Search extends React.Component {
  render() {
    return(
      <div>Search a location:
        <form onSubmit={this.props.fetchWoeid}>
          <input
            type="text"
            name="city"
          />
          <button>Go</button>
        </form>
      </div>
    )
  }
}

export default Search
