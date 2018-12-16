import React, {Component} from 'react';
import Modal from 'antd/lib/modal';
import Step from "./Step";
import SplitPane from "react-split-pane";
import {inject, observer} from 'mobx-react';
import Button from 'antd/lib/button';
import Steps from 'antd/lib/steps';
import Popover from 'antd/lib/popover';
import Icon from 'antd/lib/icon';
import Term from "./Term";


class Scenario extends Component {

  modal() {
    Modal.info({
      title: this.props.store.currentScenario.title,
      content: (
        <div>
          {this.props.store.currentScenario.description}
        </div>
      ),
      onOk() {
      },
    });
  }

  render() {
    let scenario = this.props.store.currentScenario;
    const customDot = (dot, {status, index}) => (
      <Popover content={<span>第{index}步: {scenario.steps[index - 1].description}</span>}>
        {dot}
      </Popover>
    );
    return (
      // this.props.store.hasCurrentScenario &&
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div style={{height: 60, background: '#00b7ef', flexShrink: 0}}>
          <Icon type="book" theme="twoTone" style={{fontSize: 40, lineHeight: '60px', cursor: 'pointer'}} onClick={() => {
            this.props.store.setPage('')
          }}/>
        </div>
        <div style={{flexGrow: 1, flexShrink: 1, overflow: 'hidden', position: 'relative'}}>

          <SplitPane split="vertical" minSize={50} defaultSize={480} style={{}}>
            <div>
              <div style={{height: 40, lineHeight: '40px', textAlign: 'center', fontSize: 24, background: '#2f7aa7', color: '#fff'}}>{scenario.title}</div>
              <div style={{padding: 20}}>
                {scenario.steps.length > 0 &&
                <div>
                  <Step step={scenario.steps[this.props.store.stepIndex]}/>
                  <div style={{textAlign: 'right'}}>
                    <Button.Group>
                      {this.props.store.stepIndex != 0 &&
                      <Button type="default" onClick={() => {
                        this.props.store.prevStep()
                      }}>
                        <Icon type="left"/>上一步
                      </Button>
                      }
                      {this.props.store.stepIndex != scenario.steps.length - 1 &&
                      <Button type="primary" onClick={() => {
                        this.props.store.nextStep()
                      }}>
                        下一步<Icon type="right"/>
                      </Button>
                      }
                    </Button.Group>
                  </div>
                </div>
                }
              </div>
            </div>
            <div style={{height: '100%'}}>
              <Term/>
            </div>
          </SplitPane>
        </div>
        <div style={{background: '#fff', flexShrink: 0, borderTop: '1px solid #ccc', paddingTop: 20}}>
          <Steps current={this.props.store.stepIndex + 1} progressDot={customDot} initial={1}>
            {scenario.steps.map(step => (
              <Steps.Step key={step} title={step.title}/>
            ))}
          </Steps>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(Scenario));
