import React from 'react';
import Tab from 'material-ui/Tabs';
import Methods from './group/Methods'

class Group extends React.Component {

  render(){
    return(
      <div>

        <Methods ruleEngineNr={this.props.ruleEngineNr}
        methodsData={this.props.methodsData} />

      </div>

    )
  }
}

export default Group;
