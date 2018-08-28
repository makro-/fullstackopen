import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]

    }
  }

  getRandom = (max) => {
    let random = Math.floor(Math.random() * max) 
    
      this.setState({
          selected: random
      })
      
  }

  vote = () => {
    const kopio = [...this.state.votes]
    kopio[this.state.selected] += 1
    this.setState({
        votes: kopio
    })
  }

  MostVotes = () => {
      
      const kopio = [...this.state.votes]
      let mostVotesIndex = kopio.indexOf( Math.max(...kopio) )
   
    
      return(
          <div>
          <h3>Anecdote with most votes:</h3>
          <p>{this.props.anecdotes[mostVotesIndex]} </p>
          </div>
      )

  }
  render() {
  
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} 
        <br></br>
        <button onClick={ () => this.vote()} >Vote!</button>
        <button onClick={ () => this.getRandom(anecdotes.length)} >Next anecdote!</button>
        <br></br>
        <this.MostVotes></this.MostVotes>
      </div>
      
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)