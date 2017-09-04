import React from 'react';

class ProductOutput extends React.Component{
  render(){
    let tableBody
    if(this.props.productOutputData !== null){
      tableBody = this.props.productOutputData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric">{row.Output}</td>
            <td>{row.Default_Base}</td>
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
            <th className="mdl-data-table__cell--non-numeric">Output</th>
            <th>Deafult Basis</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default ProductOutput
