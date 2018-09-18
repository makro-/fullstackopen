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
  cclicked = (event) => {

    console.log(event.target.dataset.message, 'clicked')
    this.setState({ searchTerm: event.target.dataset.message});
  }
  getCountryData(){

    const countries = this.state.countries.filter ( x => x.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    if(countries.length === 1)
    {
      return countries.map( c => 
      <div  key={c.name}> {c.name} {c.nativeName}<p>capital: {c.capital}</p><p>population: {c.population}</p><p><img src={c.flag} alt="flag"/></p> </div>
      
      )
      
    }
    else if(countries.length < 10)
    {
      return   countries.map( c => <div data-message={c.name} onClick={this.cclicked} key={c.name}> {c.name} </div>)
    } 
    else{
      return "Too many matches, specify more "
    }
  }
  
  render() {
    
    return (
      <div>
        <div>
        Find countries: 
       <input 
            value={this.state.searchTerm} 
            onChange={this.handleSearchChange}
          />
          
          </div>
          <div>

            {this.getCountryData()}

          </div>
      </div>
      
            
      
              
      
    );
  }
}

export default App;
