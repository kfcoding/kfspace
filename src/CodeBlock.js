import React from 'react';
import Lowlight from 'react-lowlight';
import shallowCompare from 'react-addons-shallow-compare';
import js from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';

Lowlight.registerLanguage('js', js);

class CodeBlock extends React.Component {
  // propTypes: {
  //   literal: React.PropTypes.string,
  //   language: React.PropTypes.string,
  //   inline: React.PropTypes.bool
  // },

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <Lowlight
        language={this.props.language || 'js'}
        value={this.props.value}
        inline={this.props.inline}
      />
    );
  }
};

export default CodeBlock;
