import dpunk from 'ic:canisters/dpunk';

import * as React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
class App extends React.Component {
    render() {
       return (
          <div>
             <ul>
             <li>Home</li>
             <li>About</li>
             <li>Contact</li>
             </ul>
             {this.props.children}
          </div>
       )
    }
 }
 export default App;

class Home extends React.Component {
    render() {
       return (
          <div>
             <h1>Home...</h1>
          </div>
       )
    }
 }
 export default Home;
 
 class About extends React.Component {
    render() {
       return (
          <div>
             <h1>About...</h1>
          </div>
       )
    }
 }
 export default About;
 
 class Account extends React.Component {
    render() {
       return (
          <div>
             <h1>Account...</h1>
          </div>
       )
    }
 }
 export default Account;

 class Claim extends React.Component {
    render() {
       return (
          <div>
             <h1>Claim...</h1>
          </div>
       )
    }
 }
 export default Claim;

// Replace the default index.js content with
// React JavaScript
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedDpunks: 0,
      user: 0,
      punkId: 0,
      punks: []
    };
    this.getOwnedPunks();
  }

  async getOwnedPunks() {
    dpunk.getOwnedPunks().then(x=> {
      this.setState({ ...this.state, ownedDpunks: x.c[0]});
    });
  }

  claimPunk() {
    dpunk.claimPunk(this.state.punkId, this.state.user).then(x=>{
      console.log(x);
      window.claimresp = x;
    });
  }

  checkPunks() {
    dpunk.userPunks(this.state.user).then(x=> {
      console.log(x);
      window.checkresp = x;
    })
  }

  onAddressChange(ev) {
    this.setState({ ...this.state, user: parseInt(ev.target.value) });
  }

  onPunkIdChange(ev) {
    this.setState({ ...this.state, punkId: parseInt(ev.target.value) });
  }
 
  render() {
    return (
      <div>
          <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                <span class="fs-4">DPunk</span>
                </a>

                <ul class="nav nav-pills">
                <li class="nav-item"><a href="/" class="nav-link active">Home</a></li>
                <li class="nav-item"><a href="/account" class="nav-link">My Punks</a></li>
                <li class="nav-item"><a href="/claim" class="nav-link">Claim!</a></li>
                <li class="nav-item"><a href="/about" class="nav-link">About</a></li>
                </ul>
            </header>
        </div>

        <Route path = "/" component = {App}/>
        <Route path = "account" component = {Account} />
        <Route path = "claim" component = {Claim} />
        <Route path = "about" component = {About} />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
      </div>
    );
  }
}


render(
<BrowserRouter>
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>
</BrowserRouter>
, document.getElementById('app'));