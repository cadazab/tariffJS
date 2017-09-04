import React from 'react'
import Client from './../../Client'
import MethodsRow from './methods/MethodsRow'

class Methods extends React.Component {

  constructor() {
    super();
    this.state = {
      methodsData: null,
      listOptions: null,
      typeOptions: null,
    };
  }

  callDatabase(){

  }

  render(){

    //var dialogClose = this.props.dialogClose
    let tableBody;

    if(this.props.methodsData !== null){
      tableBody = this.props.methodsData.map(function(row, index) {
        return(
          <MethodsRow key={index}
            methodsData={row}
           />
        )
      })
    }
    else{
        tableBody = <MethodsRow methodsData={null} />
    }

    return(
      <div className="mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">Methods</h2>
        </div>


        {/* <NewMethod options={options}
        dialogClose={this.props.dialogClose}
      /> */}

        <div id="methods" className="mdl-card__media">

          <table className="mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <th></th>
                <th className="mdl-data-table__cell--non-numeric">Name</th>
                <th>Weight</th>
                <th>List</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody >
              {tableBody}
            </tbody>

          </table>

        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button
            mdl-js-ripple-effect" onClick={this.showNew}>
             New
           </a>
        </div>
      </div>


    );
  }

  //componentDidUpdate() {
  //      window.componentHandler.upgradeDom(); //update material component

  //  }
}

export default Methods;
