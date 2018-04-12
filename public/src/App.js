import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios'

import Roulette from './components/roulette'

import { Layout } from 'antd';
const { Sider, Content } = Layout;

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataStructure: null,
      picked: [],
      playerBudget: 100,
      bet: 0,
      roulletteBudget: 1000
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/numbers')
      .then(numbers => this.setState({dataStructure: numbers.data}))
      .catch((err) => alert('Error ao buscar os números!' + JSON.stringify(err)))
  }
  
  render() {
    return (
      <Layout>
        <Layout>
          
          <Sider>
            {this.state.picked.map((pick) => {
              return (
                <span>{pick}</span>
              )
            })}
          </Sider>
          
          <Content>
            <Roulette 
              onPick={this.onPick}
              dataStructure={this.state.dataStructure}
            />
          </Content>

        </Layout>
      </Layout>
    );
  }

  onPick = (cat) => {
    if(typeof cat === 'number'){
      this.setState({
        picked: [...this.state.picked, cat]
      })
    } else {
      const numbers = this.state.dataStructure
        .filter((number) => number.groups.european.includes(cat))
        .map((number) => number.number)
      
      this.setState({
        picked: [...this.state.picked, ...numbers]
      })
    }
  }

}
