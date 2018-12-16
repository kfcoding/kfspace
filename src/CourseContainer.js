import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import {inject,observer} from 'mobx-react';
import {Route} from "react-router-dom";
import Course from "./Course";
import Scenario from "./Scenario";

class CourseContainer extends Component {


  componentDidMount() {
    this.props.store.fetchCourse(decodeURIComponent(this.props.match.params.repo)).then(() => {
      this.props.store.setLoading(false);
    })
    // this.props.store.buildCourse(decodeURIComponent(this.props.match.params.repo));
    // this.props.store.fetchGit(decodeURIComponent(this.props.match.params.repo)).then(() => {
    //   return this.props.store.fetchCourse()
    // }).then(() => {
    //   return this.props.store.course.fetchScenarios()
    // }).then(() => {
    //   Promise.all(this.props.store.course.scenarios.map(async s => {
    //     await s.fetchSteps();
    //   }))
    //
    //   this.props.store.setLoading(false);
    // });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.props.store.page == '' ?
          <Course/>
          :
          <Scenario/>
        }
        {/*<Route exact path='/courses/:repo' component={Course}/>*/}
        {/*<Route path='/courses/:repo/scenarios/:scenarioDir' component={Scenario}/>*/}
      </div>
    )
  }
}

export default inject('store')(observer(CourseContainer));
