/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const Buscador = ({realizarBusqueda, realizarFiltrado}) => {
  return (
    <>
      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Búsqueda</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => realizarBusqueda(e.target.value)}
        />
      </InputGroup>
      <Form.Select aria-label="Default select example"
          onChange={(e) => realizarFiltrado(e.target.value)}>
          <option value="date">Ordenar por fecha</option>
          <option value="title">Ordenar por nombre</option>
          <option value="type">Ordenar por tipo</option>
      </Form.Select>
    </>
  )
}

export default Buscador