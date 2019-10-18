import React, { Component } from 'react';
import { 
  IonApp,
  IonContent,
  IonIcon,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import LoadingCard from './components/LoadingCard/LoadingCard';
import BitcoinCard from './components/BitcoinCard/BitcoinCard';
import { getBitcoinPrice } from './api/Bitcoin';
import './App.css';

class App extends Component {
  state = {
    bitcoinInfo: {},
    loading: true,
  };

  async componentDidMount() {
    const bitcoinInfo = await getBitcoinPrice();

    this.setState(
      {
        bitcoinInfo,
        loading: false,
      },
      () => console.log(this.state),
    );
  }

  createLoadingCards () {
    return (
      <>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </>
    )
  }

  createBitcoinCards(bitcoinInfo) {
    return Object.keys(bitcoinInfo.bpi)
      .map((item, index) => (
        <BitcoinCard data={bitcoinInfo.bpi[item]} />
      )
    )
  }

  render() {
    const { bitcoinInfo, loading } = this.state;
    return (
      <IonApp>
        <IonContent>
          <section className="bitcoin__header">
            <IonIcon name="logo-bitcoin" className="bitcoin__logo" />
          </section>

            {loading === true
            ? this.createLoadingCards()
            : this.createBitcoinCards(bitcoinInfo)}
          
          <section className="bitcoin__disclaimer">
            <p>{bitcoinInfo.disclaimer}</p>
          </section>
        </IonContent>
      </IonApp>
    );
  }
  
}

export default App;
