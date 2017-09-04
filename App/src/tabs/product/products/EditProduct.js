import React from 'react';

class EditProduct extends React.Component{

  render(){

    var product = this.props.product;
    var ruleEngines;
    var currencies;
    var categories;

    if(this.props.options.ruleEngines !== null){
      ruleEngines = this.props.options.ruleEngines.map(function(row, index){
        return(
          <option key={index} value={row.ruleengine_nr}
            selected={row.ruleengine_nr === product.ruleengine_nr}>
            {row.ruleengine}
          </option>
        )
      })
    }else{
      ruleEngines = <option></option>
    }

    if(this.props.options.currencies !== null){
      currencies = this.props.options.currencies.map(function(row, index){
        return(
          <option key={index} value={row.currency_nr}
            selected={row.currency_nr === product.currency_nr}>
            {row.iso_code}
          </option>
        )
      })
    }else{
      currencies = <option></option>
    }

    if(this.props.options.categories !== null){
      categories = this.props.options.categories.map(function(row, index){
        return(
          <option key={index} value={row.key_category}
          selected={row.key_category === product.key_category}>
            {row.Category}
          </option>
        )
      })
    }else{
      categories = <option></option>
    }

    return(
      <form method="post"
        action="http://192.168.101.42:3006/editProduct">

      <dialog id={"edit"+this.props.productNr} className="mdl-dialog">
        <h4 className="mdl-dialog__title">Edit</h4>
        <div className="mdl-dialog__content">

            <div className="mdl-textfield mdl-js-textfield">
              <label className="edit-label">
                Rule Engine
              </label>
              <select className="mdl-textfield__input" name="ruleEngine">
                {ruleEngines}
              </select>
            </div>


            <div className="mdl-textfield mdl-js-textfield">
              <label className="edit-label">
                Currency
              </label>
              <select className="mdl-textfield__input" name="currency">
                {currencies}
              </select>
            </div>

            <div className="mdl-textfield mdl-js-textfield">
              <label className="edit-label">
                Category
              </label>
              <select className="mdl-textfield__input" name="category">
                {categories}
              </select>

            </div>

            <div className="mdl-textfield mdl-js-textfield
              mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="name"
              name="name" defaultValue={product.product} />
              <label className="mdl-textfield__label" htmlFor="name">
                Name
              </label>
            </div>

            <div className="mdl-textfield mdl-js-textfield
              mdl-textfield--floating-label
              longEdit">
              <textarea className="mdl-textfield__input" type="text"
              id="minPremium" name="minPremium" rows="3"
              defaultValue={product.min_premium} />
              <label className="mdl-textfield__label" htmlFor="minPremium">
                Min Premium
              </label>
            </div>

            <div className="mdl-textfield mdl-js-textfield
              mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="minRate"
              name="minRate" defaultValue={product.min_rate} />
              <label className="mdl-textfield__label" htmlFor="minRate">
                Min Rate
              </label>
            </div>

            <div className="mdl-textfield mdl-js-textfield
              mdl-textfield--floating-label
              longEdit">
              <textarea className="mdl-textfield__input" type="text"
              id="minDeductible" name="minDeductible"
              rows="3" defaultValue={product.min_deductible} />
              <label className="mdl-textfield__label" htmlFor="minDeductible">
                Min Deductible
              </label>
            </div>

            <div className="mdl-textfield mdl-js-textfield
              mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="rateBasis"
              name="rateBasis" defaultValue=  {product.rate_basis}/>
              <label className="mdl-textfield__label" htmlFor="rateBasis">
                Rate Basis
              </label>
            </div>

            <input type="hidden" name="productNr" value={this.props.productNr} />

        </div>
        <div className="mdl-dialog__actions">
          <button className="mdl-button mdl-js-button mdl-button--raised
            mdl-button--colored mdl-js-ripple-effect"
            type="submit" value="Save">
            save
          </button>
          <button onClick={this.props.dialogClose}
            value={"edit"+this.props.productNr}
            type="button" className="mdl-button close">
            Cancel
          </button>
        </div>
      </dialog>

      </form>

    )
  }
}

export default EditProduct;
