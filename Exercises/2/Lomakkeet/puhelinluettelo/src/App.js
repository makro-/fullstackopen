import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Persons from './components/Persons'


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
     const newPerson = {
       name: this.state.newName,
        number: this.state.newNumber
       
     }
    Persons.addPerson( newPerson)
     .then(response => {
       console.log(response)
       this.setState(
        {
         persons: this.state.persons.concat(response),
         newName: '',
         newNumber: '',
         filter:''
        }
      )
     })



  
   }
    
  }

  deletePerson = (event) =>
  {
    const personid = event.target.dataset.message
    console.log(personid)
    const persontodelete = this.state.persons.find( p => p.id == personid)
    const result = window.confirm('Poistetaanko ' + persontodelete.name + '?')
    if(result)
    {

       Persons.deletePerson(personid).then (response => {
      console.log('current', this.state.persons)
      console.log('personid', personid)
      this.state.persons.map( p => console.log('personid jou',p.id))
      var newArray = this.state.persons.filter(person => person.id != personid )
      
      console.log('newarray', newArray)
      this.setState({
        
        persons: newArray,
        newName: '',
        newNumber: '',
        filter: ''
      })
    })
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
    Persons.getPersons().then(p => {
    console.log('promise fulfilled')
    console.log('persons', p)
    this.setState({ persons: p})
    })

  }

  render() {
    console.log('persons:',this.state.persons)
    console.log('filter:',this.state.filter)
    const matches = this.state.persons.filter( x => x.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter handler={this.handleFilterChange} />

          <h3>Lisää uusi</h3>
        <AddForm lisaaNimi={this.lisaaNimi} newName={this.state.newName} handleNameChange={this.handleNameChange} newNumber={this.state.newNumber} handleNumberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
       
        {matches.map( person => <Person key={person.name} person={person} clickHandler={this.deletePerson} /> )}
      </div>
    )
  }
}


export default App;
