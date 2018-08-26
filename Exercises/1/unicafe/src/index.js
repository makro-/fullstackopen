import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistic = ({ text, counter, postfix }) => {
    return (
      <tr>
          <td>{text}</td>
          <td>{counter} {postfix}</td>
        </tr>
    )
  }
  const keskiarvo = function(hyva,huono,neutraali) {
    let jakaja = (hyva + huono + neutraali)
    if(jakaja === 0){
        return 0
    }
    return ((hyva + (-1 * huono )) / jakaja).toFixed(1)
    
  }

  const positiivisia = function(hyva,huono,neutraali) {
    let jakaja = (hyva + huono + neutraali)
    if(jakaja === 0){
        return 0
        
    }
    return (hyva / ((hyva + huono + neutraali)) * 100).toFixed(1)
  }

  const Statistics = ({ hyva,huono, neutraali }) => {
      if( hyva+huono+neutraali === 0){
        return(
            <div>
            <h2>Statistiikka</h2>
            <p>Ei yhtään palautetta annettu</p>
            </div>
        )      
      }

    return(
        <div>
        <h2>Statistiikka</h2>
        <table><tbody>
        <Statistic text="hyvä" counter={hyva}></Statistic>
        <Statistic text="neutraali" counter={neutraali}></Statistic>
        <Statistic text="huono" counter={huono}></Statistic>
        
        <Statistic text="keskiarvo" counter={keskiarvo(hyva,huono,neutraali)}></Statistic>
        <Statistic text="positiivisia" counter={ positiivisia(hyva, huono, neutraali ) } postfix="%" ></Statistic>
        </tbody>
        </table>
        </div>
    )
  }
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          hyva: 0,
          neutraali: 0,
          huono: 0
        }
      }
      
      clickHyva = () => {
          this.setState({
              hyva: this.state.hyva +1
          })
      }

      clickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali +1
        })
    }
    clickHuono = () => {
        this.setState({
            huono: this.state.huono +1
        })
    }
    render(){

        return (
        <div>
            <h2>Anna palautetta</h2>
            <Button handleClick={this.clickHyva} text="hyvä"> </Button>
            <Button handleClick={this.clickNeutraali} text="neutraali"> </Button>
            <Button handleClick={this.clickHuono} text="huono"> </Button>
            <Statistics hyva={this.state.hyva} huono={this.state.huono} neutraali={this.state.neutraali}></Statistics>
           
        </div>
        )
    }
}




ReactDOM.render(<App />, document.getElementById('root'));

