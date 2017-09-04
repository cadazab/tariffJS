import React from 'react';

class IBSproduct extends React.Component{
  render(){
    let tableBody
    if(this.props.ibsProductData !== null){
      tableBody = this.props.ibsProductData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric">{row.IBSProduct}</td>
          </tr>
        )
      })
    }
    else{
      tableBody = <tr>
                    <td></td>
                  </tr>
    }

    return(
      <table className="mdl-data-table mdl-js-data-table
         mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">IBS Product</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default IBSproduct;
