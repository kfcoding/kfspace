import React, {Component} from 'react';
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Progress from "antd/lib/progress";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import ScenarioItem from "./ScenarioItem";
import {inject, observer} from 'mobx-react';

class Course extends Component {

  state = {
    title: "",
    author: "",
    description: "",
    scenarios: [],
    course: {}
  }

  componentDidMount() {
    // this.props.store.fetchGit(decodeURIComponent(this.props.match.params.repo)).then(() => {
    //   this.props.store.fetchCourse();
    // }).then()
  }

  goto(scenario) {
    this.props.store.setCurrentScenario(scenario);
    this.props.store.setPage('scenario');
  }

  render() {
    let course = this.props.store.course;
    return (
      <div className="App">
        <div className='banner'>
          <h1>{course.title}</h1>
          <h2>作者: {course.author}</h2>
          <h3>{course.description}</h3>
        </div>
        <div style={{padding: '40px 40px'}}>
          <Row gutter={24}>
            <Col span={18}>
              <List>
                {course.scenarios.map((scenario) => (
                  <List.Item key={scenario}>
                    <List.Item.Meta
                      title={scenario.title}
                      description={scenario.description}
                    />
                    <div><Button type='primary' onClick={() => {this.goto(scenario)}}>开始实训</Button>
                    </div>
                  </List.Item>
                ))}
              </List>

            </Col>
            <Col span={6}>
              <Card
                title="课程信息"
              >
                <div>实训数量：{course.scenarios.length}</div>
                完成情况：
                <Progress type="circle" percent={0}/>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(Course));
