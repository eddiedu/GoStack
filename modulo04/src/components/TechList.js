import React, { Component } from 'React';

import TechListItem from './TechListItem';

class TechList extends Component {
  state = {
    newTech:'',
    techs: [],
  }
  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if(techs){
        this.setState({techs: JSON.parse(techs)});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }

  }

  handleInputChange = e => {
    this.setState({newTech : e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault(); //para evitar que o formulario recarregue a página

    this.setState({
        techs:[... this.state.techs, this.state.newTech],
        newTech:'',
      })
  }

  handleDelete = (tech) => {
    this.setState({techs: this.state.techs.filter( t => t !== tech)});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
      <ul>
        {this.state.techs.map(tech => 
          <TechListItem 
            key={tech} 
            tech={tech} 
            onDelete={()=> this.handleDelete(tech)} /> )}
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech} />
      </ul>
      <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
