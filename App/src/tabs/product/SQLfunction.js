import React from 'react';

class SQLfunction extends React.Component{
  render(){
    let tableBody
    if(this.props.sqlFunctionData !== null){
      tableBody = this.props.sqlFunctionData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric">{row.SQL_function}</td>
          </tr>
        )
      })
    }
    else{
      tableBody = <tr>
                    <td></td>
                    <td></td>
                  </tr>
    }

    return(
      <table className="mdl-data-table mdl-js-data-table
         mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">Function</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default SQLfunction;
