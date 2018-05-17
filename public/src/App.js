import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios'

import Roulette from './components/roulette'

import { Layout, Button, Row, Col } from 'antd';
const { Content } = Layout;

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataStructure: null,
      picked: [],
      playerBudget: 100,
      roulletteBudget: 1000,
      numberSpin: null
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/numbers')
      .then(numbers => this.setState({dataStructure: numbers.data}))
      .catch((err) => alert('Error ao buscar os números!' + JSON.stringify(err)))

    //Gerar array inicial de numeros selecionados
    const picked =  Array.from(Array(37).keys()).map(number => {
      return {number: number, value: 0}
    })

    this.setState({picked})

  }

  getBet = () => this.state.picked.reduce((memo, item) => memo += item.value, 0)

  spin = () => {
    axios.post('http://localhost:8080/spin', {numbers: this.state.picked})
      .then(({data}) => {
        if(data.win){

          this.setState({
            roulletteBudget: this.state.roulletteBudget - data.winAmount,
            playerBudget: this.state.playerBudget + data.bet + data.winAmount,
            numberSpin: `GANHOU: ${data.spin}`
          })
          this.clearBet();
          if(this.state.roulletteBudget <= 0) {
            alert('VOCE GANHOU')
          }
          
        } else {

          this.setState({
            roulletteBudget: this.state.roulletteBudget + data.bet,
            playerBudget: this.state.playerBudget - data.bet,
            numberSpin: `PERDEU: ${data.spin}`
          })
          this.clearBet();
          if(this.state.playerBudget <= 0) {
            alert('VOCE PERDEU')
          }
          
        }
      })
      .catch(console.error)
  }
  
  render() {
    return (
      <Layout>
        <Layout>

          <Content>

            <Row>
              <Col span={8} className="flex">
                <Button className="btn-reset" type="dashed" onClick={this.clearBet}>CLEAR</Button>
              </Col>
              <Col span={8} className="flex">
                {this.state.numberSpin &&
                  `SPIN: ${this.state.numberSpin}`
                }
              </Col>
              <Col span={8} className="flex">
                <Button className="btn-reset" type="dashed" onClick={this.spin}>SPIN</Button>
              </Col>
            </Row>

            <Roulette 
              onPick={this.onPick}
              dataStructure={this.state.dataStructure}
              picked={this.state.picked}
            />
            
            <div className="data-game">
              <p className="data-game-label">
                Bet: {this.getBet()}
              </p>
              <p className="data-game-label">
                Player Budge: {this.state.playerBudget}
              </p>
              <p className="data-game-label">
                Roulette Budge: {this.state.roulletteBudget}
              </p>
            </div>

          </Content>

        </Layout>
      </Layout>
    );
  }

  clearBet = () => {
    const picked =  Array.from(Array(37).keys()).map(number => {
      return {number: number, value: 0}
    })

    this.setState({
      playerBudget: this.state.playerBudget + this.getBet(),
      picked
    })
  }

  onPick = (cat) => {
    
    if(typeof cat === 'number'){
      if(this.getBet() >= 100) return;
      if(this.state.playerBudget == 0) return;

      this.setState({
        playerBudget: this.state.playerBudget - 1
      })
      
      const newPicked = this.state.picked.map(x => {
        if(x.number == cat){
          return {number: x.number, value: x.value + 1}
        } else {
          return x
        }
      })

      this.setState({
        picked: newPicked
      })

    } else {
      const picked = this.state.dataStructure
        .filter((number) => number.groups.european.includes(cat))
        .map((number) => parseInt(number.number))

      if(this.getBet() + picked.length >= 100) return;
      if(this.state.playerBudget - picked.length < 0) return;

      this.setState({
        playerBudget: this.state.playerBudget - picked.length
      })
        
      const newPicked = this.state.picked.map(pickedState => {
        
        if(picked.includes(parseInt(pickedState.number))){
          return { number: pickedState.number, value: pickedState.value + 1 }
        } else {
          return pickedState
        }

      })

      this.setState({
        picked: newPicked
      })

    }
  }

}
