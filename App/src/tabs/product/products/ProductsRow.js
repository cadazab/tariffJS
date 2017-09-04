import React from 'react';
import ProductVersion from './ProductVersion';
import EditProduct from './EditProduct';

class ProductsRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.showVersions = this.showVersions.bind(this);
    this.showEdit = this.showEdit.bind(this);
  }

  handleSelect(event, data){
    let selected = this.props.productsData.product_nr;
    let ruleEngineNr = this.props.productsData.ruleengine_nr;
    let index = this.props.index
    console.log("product"+index)
    document.getElementById("product"+index).click();
    this.props.getProductKeys(selected,ruleEngineNr);
  }

  showVersions(){
    let product_nr = this.props.productsData.product_nr;
    var dialog = document.getElementById("dialogVersions"+product_nr);
    dialog.showModal();
  }

  showEdit(){
    let product_nr = this.props.productsData.product_nr;
    var dialog = document.getElementById("edit"+product_nr);
    dialog.showModal();
  }

  render(){

    let row = this.props.productsData;
    if(row !== null){

      return(
        <tr id='tab' onClick={this.handleSelect} >
          <td>
          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor={"product"+this.props.index}>
              <input type="radio" id={"product"+this.props.index}
                value = {row.product_nr+" "+row.ruleengine_nr}
                className="mdl-radio__button"
                name="options"
                onClick={this.props.selectProduct}
              />
           </label>
           </td>
          <td className="mdl-data-table__cell--non-numeric">{row.product}</td>
          <td>{row.ruleengine}</td>
          <td>{row.iso_code}</td>
          <td>{row.Category}</td>
          <td>{row.current_version}</td>
          <td>
            <button
              id={"editButton"+row.product_nr}
              onClick={this.showEdit}
              className="mdl-button mdl-js-button mdl-button--icon
              mdl-button--colored">
              <i className="material-icons">create</i>
            </button>
            <div className="mdl-tooltip" data-mdl-for={"editButton"+row.product_nr}>
             Edit
            </div>

            <EditProduct product={row} options={this.props.options}
            productNr={row.product_nr}  dialogClose={this.props.dialogClose} />

          </td>
          <td>
            <button
              id={"versionsButton"+row.product_nr}
              onClick={this.showVersions}
              className="mdl-button mdl-js-button mdl-button--icon
              mdl-button--colored">
              <i className="material-icons">timeline</i>
            </button>
            <div className="mdl-tooltip"
              data-mdl-for={"versionsButton"+row.product_nr}>
             Versions
            </div>
            <dialog id={"dialogVersions"+row.product_nr} className="mdl-dialog">
              <h4 className="mdl-dialog__title">Versions</h4>
              <div className="mdl-dialog__content">
                <ProductVersion id="productVersion"
                productVersionData={this.props.productVersionData} />
              </div>
              <div className="mdl-dialog__actions">
                <button value={"dialogVersions"+row.product_nr}
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
          <td></td>
        </tr>
      )
    }
  }
}

export default ProductsRow;
