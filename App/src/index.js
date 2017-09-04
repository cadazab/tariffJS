import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Mousetrap from 'mousetrap'

import Product from './tabs/Product'
import Group from './tabs/Group'


class Tarif extends React.Component {

  constructor() {
    super();
    this.state = {
      productNr: null,
      ruleEngineNr: null,
      methodsData: null,
      index: 0,
    };

    this.dialogClose = this.dialogClose.bind(this);
    this.getProductKeys = this.getProductKeys.bind(this);
    this.setMethodsData = this.setMethodsData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getProductKeys(productNr, ruleEngineNr){
    this.setState({
      productNr: productNr,
      ruleEngineNr: ruleEngineNr,
    })
  }

  dialogClose(event){
    let value = event.target.value;
    var dialog = document.getElementById(value);
    dialog.close();
  }

  setMethodsData(data){
    this.setState({methodsData: data})
  }

  handleKeyPress(event){
    let i = this.state.index;
    document.getElementById("product"+this.state.index).click();
    this.setState({index: i+1})
  }

  render(){
    return(
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">

            <span className="mdl-layout-title">Pantaenius Tarif Alpha</span>

            <div className="mdl-layout-spacer"></div>

            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Product</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Group</a>
            <a href="#scroll-tab-3" className="mdl-layout__tab">Rule</a>
            <a href="#scroll-tab-4" className="mdl-layout__tab">Properties</a>
            <a href="#scroll-tab-5" className="mdl-layout__tab">Test Cases</a>
            <a href="#scroll-tab-6" className="mdl-layout__tab">Logging</a>
          </div>
        </header>
        <main className="mdl-layout__content" onKeyPress={this.handleKeyPress}>
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content" >

              <input type="text" id="one" onKeyDown={this.handleKeyPress} />

              <Product dialogClose={this.dialogClose}
              getProductKeys={this.getProductKeys}
              ruleEngineNr={this.state.ruleEngineNr}
              setMethodsData={this.setMethodsData}
            />

            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">
              <Group dialogClose={this.dialogClose}
                methodsData={this.state.methodsData}
               />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-3">
            <div className="page-content">

            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-4">
            <div className="page-content">

            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-5">
            <div className="page-content">

            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-6">
            <div className="page-content">

            </div>
          </section>
        </main>
      </div>
    );
  }

  componentDidMount() {
    Mousetrap.bind('left', this.handleKeyPress);
  }
  componentWillUnmount() {
    Mousetrap.unbind('left', this.handleKeyPress);
  }

}


// ========================================

ReactDOM.render(
  <div>
    <Tarif />
  </div>,
  document.getElementById('root')
);
