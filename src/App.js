import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import Course from "./Course";
import Scenario from "./Scenario";
import Step from "./Step";
import CourseContainer from "./CourseContainer";
import LoadingScreen from 'react-loading-screen';
import {inject, observer} from 'mobx-react';

class App extends Component {

  componentDidMount() {
    // this.props.store.fetchCourse()
  }

  render() {
    return (
      <LoadingScreen
        loading={this.props.store.loading}
        bgColor='#39a189'
        spinnerColor='#9ee5f8'
        textColor='#fff'
        logoSrc='/giphy.gif'
        text='Loading...'
        style={{height: '100%'}}
      >
      <Router>
        <div style={{height: '100%'}}>
          <Route path='/courses/:repo' component={CourseContainer}/>
          {/*<Route exact path="/repo/:repo" component={Course}/>*/}
          {/*<Route path="/scenarios/:index" component={Scenario}/>*/}
        </div>
      </Router>
      </LoadingScreen>
    );
  }
}

export default inject('store')(observer(App));
