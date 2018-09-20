import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  lisaaNimi = (event) => {
    event.preventDefault()
    
   const found = this.state.persons.some( person => person.name === this.state.newName )
   if(found)
   {
     //alert("Already added")
     const result = window.confirm(this.state.newName + ' on jo luettelossa, korvataanko vanha numero uudella?')
     if(result){
       const personToUpdate = this.state.persons.find( p => p.name === this.state.newName) 
       console.log('person to update: ', personToUpdate)
       const newPerson = {
        name: this.state.newName,
          number: this.state.newNumber,
        id: personToUpdate.id
      }
       Persons.updatePerson( newPerson)
       .then( response => {
         this.setState(
           {
              persons: this.state.persons.map( person => person.id !== personToUpdate.id ? person : response.data  ),
              newName: '',
              newNumber: '',
              filter:'',
              notification: 'Päivitettiin ' + personToUpdate.name
           }) 
           setTimeout(() => {
             this.setState({notification: null})}, 3000)
           
       })
       .catch( error => {
        this.setState(
          {
             persons: this.state.persons.filter(person => person.id != personToUpdate.id ),
             newName: '',
             newNumber: '',
             filter:'',
             notification: 'Henkilö on jo poistettu palvelimelta ' + personToUpdate.name
          }) 
          setTimeout(() => {
            this.setState({notification: null})}, 3000)
          
       })
     }

   }
   else{
      const newPerson = {
        name: this.state.newName,
          number: this.state.newNumber
        
      }
      Persons.addPerson( newPerson)
      .then(response => {
        console.log('added person', response)
        this.setState(
          {
          persons: this.state.persons.concat(response),
          newName: '',
          newNumber: '',
          filter:'',
          notification: 'Lisättiin ' + newPerson.name
          }
            )
            setTimeout(() => {
              this.setState({notification: null})}, 3000)
        })



      
      }
    
  }

  deletePerson = (event) =>
  {
    const personid = event.target.dataset.message
    console.log('deleting person', personid)
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
        filter: '',
        notification: 'Poistettiin ' + persontodelete.name
      })
      setTimeout(() => {
        this.setState({notification: null})}, 3000)
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
        <Notification message={this.state.notification}/>
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
