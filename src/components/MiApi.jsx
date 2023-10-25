/* eslint-disable react/prop-types */
import Buscador from './Buscador.jsx'
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react'

function MiApi() {
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState(data)

  useEffect(() => {
    if(data.length == 0)
      getHollidays()
  })

  const getHollidays = async () => {
    const apiResponse = await fetch("https://api.victorsanmartin.com/feriados/en.json")
    const response = await apiResponse.json()
    setData(response["data"])
    setSearchResults(response["data"])
  }

  const realizarBusqueda = (valorInput) => {
    if(valorInput == "")
      setSearchResults(data)
    else
      setSearchResults(data.filter(({date, title, type, extra}) => 
        date.toLowerCase().includes(valorInput) ||
        title.toLowerCase().includes(valorInput) ||
        type.toLowerCase().includes(valorInput) ||
        extra.toLowerCase().includes(valorInput)
      ))
  }

  const realizarFiltrado = (option) => {
      setSearchResults([...ordernarResultados(searchResults, option)])
  }

  const ordernarResultados = (array, property) => {
    return array.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    })
  }

  return (
    <>
      <Buscador realizarBusqueda={realizarBusqueda} realizarFiltrado={realizarFiltrado} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>¿Irrenunciable?</th>
            <th>Más info</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(function({date, title, type, inalienable, extra}, index) {
            return (
              <tr key={index}>
                <td>{date}</td>
                <td>{title}</td>
                <td>{type}</td>
                <td>{inalienable ? "Si" : "No"}</td>
                <td>{extra}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default MiApi