import React from 'react';

class Terminal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      
      this.callBackSubmit = props.callBackSubmit
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.setState({value: ''});
      
      this.callBackSubmit(this.state.value)
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Enviar" />
        </form>
      );
    }
  }

export default Terminal