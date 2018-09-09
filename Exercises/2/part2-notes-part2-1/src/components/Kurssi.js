import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
          <Otsikko otsikko={kurssi.nimi}/>
          <Sisalto osat={kurssi.osat}/>
          <Yhteensa osat={kurssi.osat} />
        </div>
       )
}
const Otsikko = (props) => {
  return (
      <h1>{props.otsikko}</h1>
  )
}
const Sisalto = (props) => {
const rivit = () => props.osat.map(osa => <Osa key={osa.id} osa={osa} /> )
  return (
      <div>
         {rivit()}
   
          
      </div>
  )
}
function getSum(total, num) {
return total + num.tehtavia;
}
const Yhteensa = (props) => {
  const summa = props.osat.reduce( getSum, 0) ;
  return (
      <p>yhteensä {summa} tehtävää</p>
  )
}
const Osa = (props) => {
  return(

      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}
export default Kurssi