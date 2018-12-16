import React, {Component} from 'react';
import List from "antd/lib/list";
import Button from "antd/lib/button";
import {Link} from "react-router-dom";
import {inject} from 'mobx-react';

class ScenarioItem extends Component {

  state = {
    title: '',
    description: ''
  }

  render() {
    let scenario = this.props.scenario;
    return (
      <List.Item>
        <List.Item.Meta
          title={scenario.title}
          description={scenario.description}
        />
        <div><Button type='primary'><Link to={'/scenarios/' + encodeURIComponent(this.props.sdir)}>开始实训</Link></Button></div>
      </List.Item>
    )
  }
}

export default inject('store')(ScenarioItem);
