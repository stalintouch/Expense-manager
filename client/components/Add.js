import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
var querystring = require('querystring'); 

class Add extends Component {

  constructor(){
    super()
    this.state = {
      description: '',
      amount: '',
      month: '', 
      year: '',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewExpense = this.insertNewExpense.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal(){
    this.setState({modalIsOpen: true})
  }

  closeModal(){
    this.setState({
      modalIsOpen: false,
      description:'',
      amount: '',
      year: 2016,
      messageFromServer: ''
    })
  }

  componentDidMount(){
    this.setState({month: this.props.selectedMonth})
    this.setState({year: this.props.selectedYear})
  }

  handleSelectChange(e){
    if(e.target.name == 'month'){
      this.setState({month:e.target.value})
    }
    if(e.target.name == "year"){
      this.setState({year: e.target.value})
    }
  }

  onClick(e){
    this.insertNewExpense(this);
  }

  insertNewExpense(e){
    axios.post('/insert', querystring.stringify({
      desc: e.state.description,
      amount: e.state.amount,
      month: e.state.month,
      year: e.state.year
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      e.setState({messageFromServer: response.data}, function(){console.log(response.data)})
    })
  }
  
  handleTextChange(e){
    if(e.target.name == "description"){
      this.setState({description: e.target.value})
    }
    if(e.target.name == "amount"){
      this.setState({amount: e.target.value})
    }
  }

  render() {
    if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span>
          </Button>
          <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Expense" className="Modal">
            <Link to={{pathname: '/', search: ""}} style={{textDecoration:"none"}}>
              <Button bsStyle="danger" bsSize="xsmall" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span>
              </Button>
            </Link><br/>
            <fieldset>
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}/>
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" name="amount" value={this.state.amount} onChange={this.handleTextChange} />
              <label htmlFor="month">Month:</label>
              <select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
                <option value="Jan" id="Jan">January</option>
                <option value="Feb" id="Feb">February</option>
                <option value="Mar" id="Mar">March</option>
                <option value="Apr" id="Apr">April</option>
                <option value="May" id="May">May</option>
                <option value="Jun" id="Jun">June</option>
                <option value="Jul" id="Jul">July</option>
                <option value="Aug" id="Aug">August</option>
                <option value="Sep" id="Sep">September</option>
                <option value="Oct" id="Oct">October</option>
                <option value="Nov" id="Nov">November</option>
                <option value="Dec" id="Dec">December</option>
              </select>
              <label htmlFor="year">Year:</label>
              <select id="year" name="year" value={this.state.year} onChange={this.handleSelectChange}>
                <option value="2016" id="2016">2016</option>
                <option value="2017" id="2017">2017</option>
                <option value="2018" id="2018">2018</option>
                <option value="2019" id="2019">2019</option>
                <option value="2020" id="2020">2020</option>
              </select>
            </fieldset>
            <div className="button-center">
              <br/>
              <Button bsStyle="success" bsSize="small" onClick={this.onClick}>
                Add New Expense
              </Button>
            </div>
          </Modal>
        </div>
      )
    }
    else{
      return(
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-plus"></span>
          </Button>
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
            className="Modal">
            <div className="buton-center">
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search:''}} style={{textDecoration:"none"}}>
                <Button bsStyle="success" bsSize="xsmall" onClick={this.closeModal}>
                  Close the dialog
                </Button>
              </Link>
            </div>
          </Modal>
        </div>
      )
    }
  }
}

export default Add;
