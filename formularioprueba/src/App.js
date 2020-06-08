import React from 'react';
import './App.css';
import {Table,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Accordion, Card} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class App extends React.Component {

  constructor(){
    super();
    var curTime = new Date();
      

    this.state={
      name: '',
      email: '',
      phone: '',
      questionOne : '',
      answerOne: '',
      questionTwo : '',
      answerTwo: '',
      questionThree : '',
      answerThree: '',
      date: curTime,
      encuestas: [],
      preguntas: [],
      key: '',
      showTable: false
    };
    this.addEncuesta = this.addEncuesta.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);

  }


addEncuesta(e){
  alert("Encuesta enviada");
  fetch('/api/encuesta',{
    method:'POST',
    body: JSON.stringify(this.state),
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res=> res.json())
  .then(data =>{
    console.log(data);
    this.setState({name: '',
    email: '',
    phone: '',
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    date: this.date
  });
  })
  .catch(err => console.log(err)); 
  e.preventDefault();
  
}

updateQuestions(e){
  alert("Preguntas Modificadas");
  fetch('/api/encuesta/preguntas/'+ this.state.key,{
    method:'PUT',
    body: JSON.stringify(this.state),
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res=> res.json())
  .then(data =>{
    console.log(data);
    this.setState({
      questionOne: "",
      questionTwo: "",
      questionThree: ""
  });
  })
  .catch(err => console.log(err)); 
  e.preventDefault();
  
}

componentDidMount(){
  this.fetchEncuestas();
  this.fetchPreguntas();
}

fetchEncuestas(){
  fetch('/api/encuesta').then(res => res.json())
  .then(data => 
    {
      this.setState({encuestas: data});
      console.log(this.state.encuestas);
  });
}

fetchPreguntas(){
  fetch('/api/encuesta/preguntas').then(res => res.json())
  .then(data => 
    {
      this.setState({key: data[0]._id});
      this.setState({questionOne: data[0].questionOne});
      this.setState({questionTwo: data[0].questionTwo});
      this.setState({questionThree: data[0].questionThree});
      this.setState({preguntas: data});
  });

}

handleChange(e){
const {name,value} = e.target;
this.setState({
  [name]:value
});
}


render(){
  return (
    
    <Router>
      <Route exact path="/" render={() => {
        return <div className="onlyCenter">
         
    <Form className="formularioprueba">
      <h1 className= "titulo" >Formulario de prueba</h1>
      <br/>
      <h2 className="onlyCenterText">Intuition Business</h2>
      <FormGroup>
        <Label className="colorLabel">Nombres y Apellidos</Label>
        <Input name="name"onChange={this.handleChange} type="name" value={this.state.name} ></Input>
      </FormGroup>
      <FormGroup>
        <Label className="colorLabel">Email</Label>
        <Input name="email" onChange={this.handleChange} type="email" value={this.state.email}></Input>
      </FormGroup>
      <FormGroup>
        
        <Label className="colorLabel">Teléfono</Label>
        <Input name="phone" onChange={this.handleChange} type="phone" value={this.state.phone}></Input>
      </FormGroup>
      <FormGroup>
        <Label className="colorLabel">{this.state.questionOne}</Label>
        <Input name="answerOne"onChange={this.handleChange} type="answerOne" value={this.state.answerOne}></Input>
      </FormGroup>
      <FormGroup>
        <Label className="colorLabel">{this.state.questionTwo}</Label>
        <Input name ="answerTwo"onChange={this.handleChange} type="answerTwo" value={this.state.answerTwo}></Input>
      </FormGroup>
      <FormGroup>
        <Label className="colorLabel">{this.state.questionThree}</Label>
        <Input name="answerThree" onChange={this.handleChange}type="answerThree" value={this.state.answerThree}></Input>
      </FormGroup>
      <Button color="warning" onClick={this.addEncuesta}>Enviar</Button>
      
    </Form>
    </div>

      }}></Route>



     <Route path="/edit" render={() => {
       return <div className="onlyCenter">
       <Form className="formularioprueba">
        <h1 className="titulo">Editar Preguntas</h1>
        <br/>
        <br/>

        <FormGroup>
        <Label className="colorLabel" >Edite la primera pregunta</Label>
        <Input type="questionOne" 
        name="questionOne"
        placeholder = {this.state.questionOne} 
        onChange={this.handleChange} 
        value={this.state.questionOne}></Input>
      </FormGroup>

      <FormGroup>
        <Label className="colorLabel">Edite la segunda pregunta</Label>
        <Input type="questionTwo"
        name="questionTwo"
        placeholder = {this.state.questionTwo} 
        onChange={this.handleChange} 
        value={this.state.questionTwo}></Input>
      </FormGroup>

      <FormGroup>
        <Label className="colorLabel">Edite la tercera pregunta</Label>
        <Input type="questionThree"
        name="questionThree"
        placeholder = {this.state.questionThree } 
        onChange={this.handleChange} 
        value={this.state.questionThree}></Input>
      </FormGroup>

      
       <br/>
       <Link to='/' className="onlyCenterText2">Editar y Retornar a Formulario</Link>

       <Button color="warning" onClick={this.updateQuestions}>Enviar</Button>
       </Form>
       </div>
     }}></Route>




<Route path="/admin" render={() => {
       return <div className='formularioWhite' >
         
         {
  this.state.encuestas.map(encuesta =>{
    return <div key={encuesta._id}>
   <Accordion defaultActiveKey="1">
  <Card>
    <Card.Header >
      <Accordion.Toggle className='widen' as={Button} variant="link" eventKey="0" >
        <div>
        <h6 >{encuesta.name}</h6>
        <h6>{encuesta.date}</h6>
        </div>
      
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
  <Card.Body className='bold'>
    Email: <h6>{encuesta.email}</h6>
    Teléfono: <h6>{encuesta.phone}</h6>
    {encuesta.questionOne} <h6>{encuesta.answerOne}</h6>
    {encuesta.questionTwo} <h6>{encuesta.answerTwo}</h6>
    {encuesta.questionThree} <h6>{encuesta.answerThree}</h6>
   </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>
  <div style={{ display: this.showTable ? "block" : "none" }}>

<Table id="tablaEncuestas">
<thead>
  <tr>
    <th>
      Nombre
    </th>
    <th>
      Email
    </th>
    <th>
      Telefono
    </th>
    <th>
      Primera Pregunta
    </th>
    <th>
      Primera Respuesta
    </th>
    <th>
      Segunda Pregunta
    </th>
    <th>
      Segunda Respuesta
    </th>
    <th>
      Tercera Pregunta
    </th>
    <th>
      Tercera Respuesta
    </th>
  </tr>
</thead>
<tbody>
  {
    this.state.encuestas.map(encuesta => {
      return(
        <tr key={encuesta._id}>
          <td>
 { encuesta.name}
          </td>
          <td>
 { encuesta.email}
          </td>
          <td>
 { encuesta.phone}
          </td>
          <td>
 { encuesta.questionOne}
         </td>
          <td>
 { encuesta.answerOne}
         </td>
         <td>
 { encuesta.questionTwo}
         </td>
         <td>
 { encuesta.answerTwo}
         </td>
         <td>
 { encuesta.questionThree}
         </td>
         <td>
 { encuesta.answerThree}
         </td>
        </tr>
      )
    })
  }
</tbody>
</Table>
  </div> 
      </div>

  })
}
<br/>
<ReactHTMLTableToExcel 
id="botonExportarExcel" 
className="btn btn-warning"
table="tablaEncuestas"
filename="encuestasExcel"
sheet="pagina 1"
buttonText="Exportar a Excel"
/>
       </div>
     }}></Route>
 
  </Router>
  );
}  
}

export default App;
