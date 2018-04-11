import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';

import Roulette from './components/roulette'

import { Layout } from 'antd';
const { Sider, Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Layout>
          <Sider>Sider</Sider>
          <Content><Roulette /></Content>
        </Layout>
      </Layout>
    );
  }
}
