import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import '../css/App.css';
import Add from './Add';
import Update from './Update';
import Delete from './delete';
import YearTabsRouter from './tabs/yearTabsRouter';
import { Tab, Tabs } from 'react-bootstrap'

class App extends Component {
  constructor(){
    super();
    this.state = {selectedMonth: 'Jan', selectedYear: 2016, data: [], activeTab: 2016}
    this.getData = this.getData.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  componentDidMount(){
    this.getData(this, this.state.selectedYear);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.history.location.search){
    var search = nextProps.history.location.search;
    search = search.substring(1);
    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    this.setState({activeTab: parseInt(searchObj.year)});
    this.setState({selectedYear: searchObj.year});
    this.setState({selectedMonth: searchObj.month});
    this.getData(this, searchObj.year, searchObj.month);
  }else{
      this.getData(this, 2016, 'All');
    }
  }

  getData(e, year, month){
    axios.get('/getAll?month='+month+'&year='+year)
      .then(function(res){
        e.setState({data: res.data})
        e.setState({selectedYear: year})
        e.setState({selectedMonth: month})
      })
  }

  handleSelect(selectedTab){
    this.setState({
      activeTab: selectedTab,
      selectedYear: selectedTab
    })
  }

  changeYear(e){
    this.setState({selectedYear: e.target.value}, () => this.getData(this, this.state.selectedYear))
  }

  render() { 
    return (
      <div>
        <Tabs id="tabsmenu" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2016} title={<YearTabsRouter year='2016' />}></Tab>
          <Tab eventKey={2017} title={<YearTabsRouter year='2017' />}></Tab>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}></Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}></Tab>
        </Tabs>

        <Add 
          selectedMonth={this.state.selectedMonth} 
          selectedYear={this.state.selectedYear}
        /> 
        <h4>Change year:</h4>
        <select name="year" id="year" value={this.state.selectedYear} onChange={this.changeYear}>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select> 
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="desc-col">Description</th>
              <th className="button-col">Amount</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
              <th className="button-col">Update</th>
              <th className="button-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(exp){
              return (
                <tr key={exp._id}>
                  <td className="counterCell" key="1234"></td>
                  <td className="desc-col" key={exp.description}>{exp.description}</td> 
                  <td className="button-col" key={exp.amount}>{exp.amount}</td> 
                  <td className="button-col" key={exp.month}>{exp.month}</td> 
                  <td className="button-col" key={exp.year}>{exp.year}</td> 
                  <td className="button-col"><Update expense={exp}/></td> 
                  <td className="button-col"><Delete expense={exp}/></td> 

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;