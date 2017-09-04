import React from 'react';
import Client from './../../Client'
import ProductsRow from './products/ProductsRow'
import NewProduct from './products/NewProduct';

class Products extends React.Component {

  constructor() {
    super();
    this.state = {
      productsData: null,
      ruleEngineOptions: null,
      currencyOptions: null,
      categoryOptions: null,
    };

    this.getInitialData();

    this.showNew = this.showNew.bind(this);

  }

  showNew(){
    var dialog = document.getElementById("newProduct");
    dialog.showModal();
  }

  // Call Data Base Functions
  getInitialData() {
    Client.getDataFromServer('/initialData', (data) => {
      this.setState({productsData: data});

      Client.getDataFromServer('/ruleEngineOptions', (data) => {
        this.setState({ruleEngineOptions: data});
      })

      Client.getDataFromServer('/currencyOptions', (data) => {
        this.setState({currencyOptions: data});
      })

      Client.getDataFromServer('/categoryOptions', (data) => {
        this.setState({categoryOptions: data});
      })
    })
  }

  handleInputChange(event){
   const target = event.target;

   this.setState({
     [target.name]: target.value
   });
  }

  render(){
    let tableBody
    var productNr = this.props.productNr
    var selectProduct = this.props.selectProduct
    var productVersionData = this.props.productVersionData
    var options = {
      ruleEngines: this.state.ruleEngineOptions,
      currencies: this.state.currencyOptions,
      categories: this.state.categoryOptions,
    }
    var getProductKeys = this.props.getProductKeys
    var dialogClose = this.props.dialogClose

    if(this.state.productsData !== null){

      tableBody = this.state.productsData[0].map(function(row, index) {
        return(
          <ProductsRow key={index}
            index={index}
            productsData={row}
            productNr={productNr}
            selectProduct={selectProduct}
            productVersionData={productVersionData}
            options={options}
            dialogClose={dialogClose}
            getProductKeys={getProductKeys}
           />
        )
      })
    }
    else{
        tableBody = <ProductsRow productsData={null} />
    }

    return(
      <div className="mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">Products {this.props.franz}</h2>
        </div>

        <NewProduct options={options}
        dialogClose={this.props.dialogClose}
        />

        <div id="products" className="mdl-card__media">

          <table className="mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <th></th>
                <th className="mdl-data-table__cell--non-numeric">Name</th>
                <th>Rule Engine</th>
                <th>Currency</th>
                <th>Category</th>
                <th>Current Version</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody >
              {tableBody}
            </tbody>

          </table>

        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button
            mdl-js-ripple-effect" onClick={this.showNew}>
             New
           </a>
        </div>
      </div>


    );
  }

  componentDidUpdate() {
        window.componentHandler.upgradeDom(); //update material component

    }
}

export default Products;
