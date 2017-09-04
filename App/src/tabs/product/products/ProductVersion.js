import React from 'react';

class ProductVersion extends React.Component {
  render(){

    let tableBody
    if(this.props.productVersionData !== null){
      tableBody = this.props.productVersionData.map(function(row, index) {
        return(
          <tr key={index}>
            <td className="mdl-data-table__cell--non-numeric test">{row.Changelog}</td>
            <td>{row.Staff}</td>
            <td>{row.TS}</td>
            <td>{row.version}</td>
          </tr>
        )
      })
    }
    else{
      tableBody = <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
    }

    return(
      <table className="mdl-data-table mdl-js-data-table
         mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric test">Change Log</th>
            <th>Staff</th>
            <th>TS</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    )
  }
}

export default ProductVersion;
