import React from 'react';

class ProductCalculations extends React.Component{
  render(){
    let tableBody
    if(this.props.productCalculationsData !== null){
      tableBody = this.props.productCalculationsData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric">{row.property}</td>
            <td>{row.Compute_order}</td>
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
            <th className="mdl-data-table__cell--non-numeric">Property</th>
            <th>Compute Order</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default ProductCalculations;
