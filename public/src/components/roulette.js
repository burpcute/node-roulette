import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      structure: [
        [3,6,9,12,15,18,21,24,27,30,33,36],
        [2,5,8,11,14,17,20,23,26,29,32,35],
        [1,4,7,10,13,16,19,22,25,28,31,34]
      ]
    }
  }

  getClass = (number) => {
    return this.props.dataStructure ? this.props.dataStructure.filter(el => el.number == number)[0].groups.european.join(' ') : ''
  }

  render() {
    if(!this.props.dataStructure){
      return (<h1>Loading....</h1>)
    }

    return (
      <Row>
        <Col span={2}><Button ghost className="GREEN" onClick={() => this.props.onPick(0)}>0</Button></Col>
        <Col span={20}>
          {
            this.state.structure.map(line => {
              return (
                <Row key={line}>
                  {
                    line.map(number => {
                      return (
                        <Col key={number} span={2}><Button ghost className={this.getClass(number)} onClick={() => this.props.onPick(number)}> 
                          {number} 
                          {this.props.picked.filter(n => n.number == number).length && this.props.picked.filter(n => n.number == number)[0].value > 0 &&
                            <p className="money">{this.props.picked.filter(n => n.number == number)[0].value}</p>
                          }
                        </Button></Col>
                      )
                    })
                  }
                </Row>
              )
            })
          }
          <Row>
            <Col span={8}><Button className="bottom-dozen" onClick={() => this.props.onPick('FIRST_1/12_HORIZONTAL')}>1st 1/12</Button></Col>
            <Col span={8}><Button className="bottom-dozen" onClick={() => this.props.onPick('SECOND_1/12_HORIZONTAL')}>2nd 1/12</Button></Col>
            <Col span={8}><Button className="bottom-dozen" onClick={() => this.props.onPick('THIRD_1/12_HORIZONTAL')}>3rd 1/12</Button></Col>
          </Row>
          <Row>
            <Col span={4}><Button className="bottom-dozen" onClick={() => this.props.onPick('1-18')}>1 to 18</Button></Col>
            <Col span={4}><Button className="bottom-dozen" onClick={() => this.props.onPick('EVEN')}>Even</Button></Col>
            <Col span={4}><Button className="bottom-dozen RED" onClick={() => this.props.onPick('RED')}></Button></Col>
            <Col span={4}><Button className="bottom-dozen BLACK" onClick={() => this.props.onPick('BLACK')}></Button></Col>
            <Col span={4}><Button className="bottom-dozen" onClick={() => this.props.onPick('ODD')}>Odd</Button></Col>
            <Col span={4}><Button className="bottom-dozen" onClick={() => this.props.onPick('19-36')}>19 to 36</Button></Col>
          </Row>
        </Col>
        <Col span={2} className="right-dozens">
            <Row>
              <Col span={24}><Button className="right-dozen" onClick={() => this.props.onPick('THIRD_1/12_VERTICAL')}>2 to 1</Button></Col>
            </Row>
            <Row>
              <Col span={24}><Button className="right-dozen" onClick={() => this.props.onPick('SECOND_1/12_VERTICAL')}>2 to 1</Button></Col>
            </Row>
            <Row>
              <Col span={24}><Button className="right-dozen" onClick={() => this.props.onPick('FIRST_1/12_VERTICAL')}>2 to 1</Button></Col>
            </Row>
        </Col>
      </Row>
    );
  }
}
