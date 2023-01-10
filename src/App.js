import './App.css';

import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';

import {
  BrowserRouter, Routes,
  Route,

} from 'react-router-dom';
export default class App extends Component {


  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          {/* <Route path='/about' element={<About mode={mode} />} /> */}
          <Routes>
            <Route exact path='/' element={<News key='general' country='us' category='general' />} />
            <Route exact path='/business' element={<News key='business' country='us' category='business' />} />
            <Route exact path='/ertainment' element={<News key='ertainment' country='us' category='ertainment' />} />
            <Route exact path='/health' element={<News key='health' country='us' category='health' />} />
            <Route exact path='/science' element={<News key='science' country='us' category='science' />} />
            <Route exact path='/sports' element={<News key='sports' country='us' category='sports' />} />
            <Route exact path='/technology' element={<News key='technology' country='us' category='technology' />} />
          </Routes>
        </BrowserRouter>

      </div>
    )
  }
}
