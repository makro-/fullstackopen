import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import axios from 'axios'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  lisaaNimi = (event) => {
    event.preventDefault()
 
   const found = this.state.persons.some( person => person.name === this.state.newName )
   if(found)
   {
     alert("Already added")
   }
   else{
    const persons = this.state.persons.concat({name: this.state.newName, numero: this.state.newNumber});
    this.setState(
      {
          persons
      }
    )
   }
    
  }

  handleNameChange = (event) =>
  {
    this.setState({newName: event.target.value})
  }
  handleNumberChange = (event) =>
  {
    this.setState({newNumber: event.target.value})
  }
  handleFilterChange = (event) =>
  {

       this.setState({filter: event.target.value})

  }

  componentDidMount() {
    axios.get('http://localhost:3001/persons').then(response => {
    console.log('promise fulfilled')
  this.setState({ persons: response.data })
})

  }
  render() {
    const matches = this.state.persons.filter( x => x.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter handler={this.handleFilterChange} />

          <h3>Lisää uusi</h3>
        <AddForm lisaaNimi={this.lisaaNimi} newName={this.state.newName} handleNameChange={this.handleNameChange} newNumber={this.state.newNumber} handleNumberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
       
        {matches.map( person => <Person key={person.name} person={person} /> )}
      </div>
    )
  }
}


export default App;
