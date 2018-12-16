import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import {inject, observer} from 'mobx-react';

class Step extends Component {

  state = {
    source: '123'
  }

  render() {
    return (
      <div>
        <ReactMarkdown source={this.props.step.text} renderers={{inlineCode: CodeBlock, code: CodeBlock}}/>
      </div>
    )
  }
}

export default inject('store')(observer(Step));
