import React from 'react'

class MethodsRow extends React.Component{

  render(){

    let row = this.props.methodsData;
    if(row !== null){

      return(
        <tr id='tab'  >
          <td>
          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor={row.method_nr}>
              <input type="radio" id={row.method_nr}
                value = {row.method_nr}
                className="mdl-radio__button"
                name="options"

              />
           </label>
           </td>
          <td className="mdl-data-table__cell--non-numeric">{row.method}</td>
          <td>{row.weight}</td>
          <td>{row.Priority}</td>
          <td>{row.type}</td>
          <td>
            <button
              id={"editButton"+row.method_nr}

              className="mdl-button mdl-js-button mdl-button--icon
              mdl-button--colored">
              <i className="material-icons">create</i>
            </button>
            <div className="mdl-tooltip" data-mdl-for={"editButton"+row.method_nr}>
             Edit
            </div>



          </td>
          <td>
            <button
              id={"versionsButton"+row.method_nr}
              onClick={this.showVersions}
              className="mdl-button mdl-js-button mdl-button--icon
              mdl-button--colored">
              <i className="material-icons">timeline</i>
            </button>
            <div className="mdl-tooltip"
              data-mdl-for={"versionsButton"+row.method_nr}>
             Versions
            </div>
            <dialog id={"dialogVersions"+row.method_nr} className="mdl-dialog">
              <h4 className="mdl-dialog__title">Versions</h4>
              <div className="mdl-dialog__content">

              </div>
              <div className="mdl-dialog__actions">
                <button value={"dialogVersions"+row.method_nr}
                  onClick={this.props.dialogClose}
                  type="button" className="mdl-button close">Close</button>
              </div>
            </dialog>
          </td>
        </tr>
      )
    }else{
      return(
        <tr>
          <td>
          <label className="mdl-checkbox mdl-js-checkbox ">
              <input type="checkbox" className="mdl-checkbox__input" />
           </label>
           </td>
          <td className="mdl-data-table__cell--non-numeric"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    }


  }
}

export default MethodsRow;
