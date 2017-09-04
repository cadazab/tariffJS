import React from 'react';

class ProductCurrencies extends React.Component{
  render(){
    let tableBody
    if(this.props.productCurrenciesData !== null){
      tableBody = this.props.productCurrenciesData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric">{row.iso_code}</td>
            <td>{row.xrate}</td>
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
            <th className="mdl-data-table__cell--non-numeric">Currency</th>
            <th>Xrate</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default ProductCurrencies;
