import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Button } from 'antd';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      structure: [
        [3,6,9,12,15,18,21,24,27,30,33,36],
        [2,5,8,11,14,17,20,23,26,29,32,35],
        [1,4,7,10,13,16,19,22,25,28,31,34]
      ],
      dataStructure: null
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/numbers')
      .then(numbers => this.setState({dataStructure: numbers.data}))
      .catch((err) => alert('Error ao buscar os números!' + JSON.stringify(err)))
  }

  getClass = (number) => {
    return this.state.dataStructure ? this.state.dataStructure.filter(el => el.number == number)[0].groups.american.join(' ') : ''
  }

  render() {
    if(!this.state.dataStructure){
      return (<h1>Loading....</h1>)
    }

    return (
      <Row>
        <Col span={2}><Button ghost className="GREEN">0</Button></Col>
        <Col span={20}>
          {
            this.state.structure.map(line => {
              return (
                <Row>
                  {
                    line.map(number => {
                      return (
                        <Col span={2}><Button ghost className={this.getClass(number)} >{number}</Button></Col>
                      )
                    })
                  }
                </Row>
              )
            })
          }          
          <Row>
            <Col span={8}><Button className="bottom-dozen">First 1/12</Button></Col>
            <Col span={8}><Button className="bottom-dozen">Second 1/12</Button></Col>
            <Col span={8}><Button className="bottom-dozen">Third 1/12</Button></Col>
          </Row>
        </Col>
        <Col span={2} className="right-dozens">
            <Row>
              <Col span={24}><Button className="right-dozen">2:1</Button></Col>
            </Row>
            <Row>
              <Col span={24}><Button className="right-dozen">2:1</Button></Col>
            </Row>
            <Row>
              <Col span={24}><Button className="right-dozen">2:1</Button></Col>
            </Row>
        </Col>
      </Row>
    );
  }
}
