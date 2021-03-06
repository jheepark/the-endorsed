import React from 'react'
import ProductList from '../Product/ProductList'
import Firebase from 'firebase'
import connectToStores from 'alt-utils/lib/connectToStores'
import ProductStore from '../../stores/ProductStore'
import Actions from '../../actions'

let config = {
  // apiKey: process.env.api_key,
  apiKey: "AIzaSyCom139ZEnv8Z_a9MJ-ZC2ajS4l1QVUDX0",
  authDomain: "codehunt-demo-556d8.firebaseapp.com",
  databaseURL: "https://codehunt-demo-556d8.firebaseio.com",
  projectId: "codehunt-demo-556d8",
  storageBucket: "codehunt-demo-556d8.appspot.com"
};
Firebase.initializeApp(config);

@connectToStores
class HomePage extends React.Component {
  constructor() {
    super();
    Actions.getProducts();
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  render() {
    return (
      <section>
        <header>
          <img src="/img/theendorsedv1.png" width="100%" class='headerBanner' />
        </header>

        <section>
          <section className="container">
            {
              this.props.products
              ?
              <ProductList productList={this.props.products}/>
              :
              null
            }
          </section>
        </section>
      </section>
    );
  }
}

export default HomePage;
