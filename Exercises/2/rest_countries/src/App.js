import React from 'react'

import axios from 'axios'

class App extends React.Component {
  
  
  constructor() {
    super()
    this.state = {
      countries: [],
      searchTerm: '',
      
    }
  }
  
  
  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }
  
  handleSearchChange = (event) => {
    console.log(event.target.value)
    this.setState({ searchTerm: event.target.value })
  }
  
  
  render() {
    const countriesToShow = this.state.countries.filter ( x => x.name.toLowerCase().includes(this.state.searchTerm));
    return (
      <div>
        Find countries: 
       <input 
            value={this.state.searchTerm} 
            onChange={this.handleSearchChange}
          />
          {countriesToShow.map( c => <div key={c.name}> {c.name} </div>)}
      </div>
      
            
      
              
      
    );
  }
}

export default App;
