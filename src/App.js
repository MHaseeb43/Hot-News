import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  page = 5;
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (

      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route exact path='/general' element={<News setProgress={this.setProgress} key="/general" page={this.page} country="in" category="general" />} />
            <Route exact path='/general' element={<News setProgress={this.setProgress} key="/general" page={this.page} country="in" category="general" />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} key="/business" pageSize={6} country="in" category="business" />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="/entertainment" pageSize={6} country="in" category="entertainment" />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} key="/health" pageSize={6} country="in" category="health" />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} key="/science" pageSize={6} country="in" category="science" />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key="/sports" pageSize={6} country="in" category="sports" />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key="/technology" pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
