import React from 'react';

class ProductOffices extends React.Component{
  render(){
    let tableBody
    if(this.props.productOfficesData !== null){
      tableBody = this.props.productOfficesData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric">{row.name}</td>
            <td>{row.OrderBy}</td>
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
            <th className="mdl-data-table__cell--non-numeric">Mandant</th>
            <th>Order By</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default ProductOffices;
