import React from 'react';
import Products from './product/Products'
import SQLfunction from './product/SQLfunction'
import ProductOffices from './product/ProductOffices'
import ProductCurrencies from './product/ProductCurrencies'
import ProductOutput from './product/ProductOutput'
import ProductCalculations from './product/ProductCalculations'
import IBSproduct from './product/IBSproduct'
import Client from './../Client'

class Product extends React.Component{

  constructor() {
    super();
    this.state = {
      productVersionData: null,
      sqlFunctionData: null,
      productOfficesData: null,
      productCurrenciesData: null,
      productOutputData: null,
      productCalculationsData:null,
      ibsProductData: null,
    };

    this.handleSelectProduct = this.handleSelectProduct.bind(this);
  }

  handleSelectProduct(event) {
    let keys = event.target.value.split(" ");
    let productNr = keys[0];
    let ruleEngineNr = keys[1];

    Client.getDataFromServer('/methodsData/'+ruleEngineNr,(data) => {
      this.props.setMethodsData(data)
    })

    Client.getDataFromServer('/ProductVersion/'+productNr, (data) => {
      this.setState({productVersionData: data})
    })

    Client.getDataFromServer('/SQLfunction/'+productNr, (data) => {
      this.setState({sqlFunctionData: data})
    })

    Client.getDataFromServer('/ProductOffices/'+productNr, (data) => {
      this.setState({productOfficesData: data})
    })

    Client.getDataFromServer('/ProductCurrencies/'+productNr, (data) => {
      this.setState({productCurrenciesData: data})
    })

    Client.getDataFromServer('/ProductOutput/'+productNr, (data) => {
      this.setState({productOutputData: data})
    })

    Client.getDataFromServer('/ProductCalculations/'+productNr, (data) => {
      this.setState({productCalculationsData: data})
    })

    Client.getDataFromServer('/IBSproduct/'+productNr, (data) => {
      this.setState({ibsProductData: data})
    })
  }



  render(){
    return(
      <div>

        <Products id="products" productNr={this.state.productNr}
        selectProduct={this.handleSelectProduct}
        productVersionData={this.state.productVersionData}
        dialogClose={this.props.dialogClose}
        getProductKeys={this.props.getProductKeys}
        franz={this.props.franz}
       />

      <div id="productCalculationsCard" className="mdl-card">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text ">Calculations</h2>
        </div>
        <div id="productCalculations" className="mdl-card__media">
          <ProductCalculations
            productCalculationsData={this.state.productCalculationsData} />
        </div>
      </div>

      <div id="SQLfunctionCard" className="mdl-card">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">SQL Functions</h2>
        </div>
        <div id="SQLfunction" className="mdl-card__media">
          <SQLfunction sqlFunctionData={this.state.sqlFunctionData} />
        </div>
      </div>

      <div id="productOfficesCard" className="mdl-card">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">Offices</h2>
        </div>
        <div id="productOffices" className="mdl-card__media">
          <ProductOffices productOfficesData={this.state.productOfficesData} />
        </div>
      </div>

      <div id="productCurrenciesCard" className="mdl-card">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">Currencies</h2>
        </div>
        <div id="productCurrencies" className="mdl-card__media">
          <ProductCurrencies
            productCurrenciesData={this.state.productCurrenciesData} />
        </div>
      </div>

      <div id="productOutputCard" className="mdl-card">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">Output Data</h2>
        </div>
        <div id="productOutput" className="mdl-card__media">
          <ProductOutput productOutputData={this.state.productOutputData} />
        </div>
      </div>

      <div id="IBSproductCard" className="mdl-card">
        <div className="mdl-card__title">
         <h2 className="mdl-card__title-text">IBS Product</h2>
        </div>
        <div id="IBSproduct" className="mdl-card__media">
          <IBSproduct ibsProductData={this.state.ibsProductData} />
        </div>
      </div>

    </div>
    );
  }

}

export default Product;
