import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const addPerson = ( person ) => {
    console.log(person)
   return axios.post(baseUrl, person).then( resp => {return resp.data})

}
const getPersons = () => {
    return axios.get(baseUrl).then(r => {return  r.data } )
}
const deletePerson = (personID) => {
    console.log(personID)
    return axios.delete(baseUrl + '/' + personID)
}
export default { addPerson, getPersons, deletePerson }