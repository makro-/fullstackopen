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
    console.log('Persons.js deletePerson', personID)
    return axios.delete(baseUrl + '/' + personID)
}
const updatePerson = ( person ) => {
    console.log('Persons.updatePerson', person)
   return axios.put(`${baseUrl}/${person.id}` , person)

}
export default { addPerson, getPersons, deletePerson,updatePerson }