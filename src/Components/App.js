import React from 'react';
import WelcomeComponent from './WelcomeComponent.jsx'
import CurrentCostOfLivingComponent from './CurrentCostOfLivingComponent.jsx'
import CityDropDownComponent from './CityDropDownComponent.jsx'
import NewCostOfLivingComponent from './NewCostOfLivingComponent.jsx'

class App extends React.Component {

  constructor () {
    super();

    this.state = {
      step: 1,
      currentCostOfLiving: '',
      currencyType: 'USD',
      currentCity: '',
      newCity: '',
      newCitySlug: '',
      newCostOfLiving: 0,
      rentPercentChange: 0,
      groceriesPercentChange: 0,
      restaurantPercentChange: 0,
      purchasingPercentChange: 0
    };

    this.handleCurrentCostOfLivingInput = this.handleCurrentCostOfLivingInput.bind(this);
    this.handleCurrencyType = this.handleCurrencyType.bind(this);
    this.handleCurrentCity = this.handleCurrentCity.bind(this);
    this.handleNewCity = this.handleNewCity.bind(this);
    this.calculateNewCostOfLivingAndNextStep = this.calculateNewCostOfLivingAndNextStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.resetToFirstStep = this.resetToFirstStep.bind(this);
  }

  handleCurrentCostOfLivingInput (e) {
    this.setState({
      currentCostOfLiving: e.target.value
    });
  }

  handleCurrencyType (e) {
    this.setState({
      currencyType: e.target.value
    })
  }

  handleCurrentCity (e) {
    let currencyType;

    // if (e.target.value.indexOf("United States") >= 0) {
    //   currencyType = 'USD';
    // } else if (e.target.value.indexOf("Canada") >= 0) {
    //   currencyType = 'CAD';
    // } else if (e.target.value.indexOf("Bermuda") >= 0) {
    //   currencyType = 'BMD';
    // } else if (e.target.value.indexOf("Panama") >= 0) {
    //   currencyType = 'PAB';
    // } else if (e.target.value.indexOf("Costa Rica") >= 0) {
    //   currencyType = 'CRC';
    // } else if (e.target.value.indexOf("Argentina") >= 0) {
    //   currencyType = 'ARS';
    // } else if (e.target.value.indexOf("Dominican Republic") >= 0) {
    //   currencyType = 'DOP';
    // } else if (e.target.value.indexOf("Chile") >= 0) {
    //   currencyType = 'CLP';
    // } else if (e.target.value.indexOf("Guatemala") >= 0) {
    //   currencyType = 'GTQ';
    // } else if (e.target.value.indexOf("Peru") >= 0) {
    //   currencyType = 'PEN';
    // } else if (e.target.value.indexOf("Mexico") >= 0) {
    //   currencyType = 'MXN';
    // } else if (e.target.value.indexOf("Colombia") >= 0) {
    //   currencyType = 'COP';
    // }

    // this.setState({
    //   currentCity: e.target.value,
    //   currencyType: currencyType
    // });

    this.setState({
      currentCity: e,
      currencyType: currencyType
    });
  }

  handleNewCity (e) {
    // this.setState({
    //   newCity: e.target.value
    // });

    this.setState({
      newCity: e
    });
  }

  calculateNewCostOfLivingAndNextStep () {
    const currentCostOfLiving = Number(this.state.currentCostOfLiving);
    const currentCity = this.state.currentCity;
    const newCity = this.state.newCity;
    
    let newCostOfLiving;
    let rentPercentChange;
    let groceriesPercentChange;
    let restaurantPercentChange;
    let purchasingPercentChange;

    const dataSet = require('../data/cost_of_living_indices.json');

    const currentCityIndex = dataSet[currentCity].index;
    const newCityIndex = dataSet[newCity].index;
    const currentCityRentIndex = dataSet[currentCity].rent_index;
    const newCityRentIndex = dataSet[newCity].rent_index;
    const newCitySlug = dataSet[newCity].slug;
    const currentCityGroceriesIndex = dataSet[currentCity].groceries_index;
    const newCityGroceriesIndex = dataSet[newCity].groceries_index;
    const currentCityRestaurantIndex = dataSet[currentCity].restaurant_index;
    const newCityRestaurantIndex = dataSet[newCity].restaurant_index;
    const currentCityPurchasingIndex = dataSet[currentCity].purchasing_index;
    const newCityPurchasingIndex = dataSet[newCity].purchasing_index;

    if (newCityIndex !== currentCityIndex) {
      let fractionalChange = ((newCityIndex - currentCityIndex)/currentCityIndex);
      newCostOfLiving = (currentCostOfLiving + (currentCostOfLiving * fractionalChange));
    } else {
      newCostOfLiving = currentCostOfLiving;
    }

    if (newCityRentIndex !== currentCityRentIndex) {
      rentPercentChange = Math.round(((newCityRentIndex - currentCityRentIndex)/currentCityRentIndex) * 100);
    }

    if (newCityGroceriesIndex !== currentCityGroceriesIndex) {
      groceriesPercentChange = Math.round(((newCityGroceriesIndex - currentCityGroceriesIndex)/currentCityGroceriesIndex) * 100);
    }

    if (newCityRestaurantIndex !== currentCityRestaurantIndex) {
      restaurantPercentChange = Math.round(((newCityRestaurantIndex - currentCityRestaurantIndex)/currentCityRestaurantIndex) * 100);
    }

    if (newCityPurchasingIndex !== currentCityPurchasingIndex) {
      purchasingPercentChange = Math.round(((newCityPurchasingIndex - currentCityPurchasingIndex)/currentCityPurchasingIndex) * 100);
    }

    this.setState({
      newCitySlug: newCitySlug,
      newCostOfLiving: (Math.round(newCostOfLiving/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      rentPercentChange: rentPercentChange,
      groceriesPercentChange: groceriesPercentChange,
      restaurantPercentChange: restaurantPercentChange,
      purchasingPercentChange: purchasingPercentChange
    });

    this.nextStep();
  }

  nextStep () {
    this.setState({
      step: this.state.step + 1 
    });
  }

  previousStep () {
    this.setState({
      step: this.state.step - 1
    });
  }

  resetToFirstStep () {
    this.setState({
      step: 1,
      currentCostOfLiving: '',
      currencyType: '$',
      currentCity: '',
      newCity: '',
      newCitySlug: '',
      newCostOfLiving: 0,
      rentPercentChange: 0,
      groceriesPercentChange: 0,
      restaurantPercentChange: 0,
      purchasingPercentChange: 0
    })
  }

  render () {
    switch (this.state.step) {
      case 1:
        return <WelcomeComponent nextStep={this.nextStep}/>
      case 2:
        return <CityDropDownComponent id='cityDropdown'
                      value={this.state.currentCity} 
                      valueField='index' labelField='city' 
                      onChange={this.handleCurrentCity}
                      nextStep={this.nextStep}
                      previousStep={this.previousStep}
                      stepNumber={this.state.step}
                      resetToFirstStep={this.resetToFirstStep}/>
      case 3:
        return <CurrentCostOfLivingComponent value={this.state.currentCostOfLiving} 
                          currencyValue={this.state.currencyType}
                          onChange={this.handleCurrentCostOfLivingInput} 
                          onChangeOfCurrencyType={this.handleCurrencyType}
                          nextStep={this.nextStep}
                          previousStep={this.previousStep}
                          resetToFirstStep={this.resetToFirstStep}/>
      case 4:
        return <CityDropDownComponent id='cityDropdown'
                      value={this.state.newCity} 
                      valueField='index' labelField='city' 
                      onChange={this.handleNewCity}
                      nextStep={this.calculateNewCostOfLivingAndNextStep}
                      previousStep={this.previousStep}
                      stepNumber={this.state.step}
                      resetToFirstStep={this.resetToFirstStep}/>
      case 5:
        return <NewCostOfLivingComponent value={this.state.newCostOfLiving}
                         currentCostOfLiving={this.state.currentCostOfLiving}
                         newCity={this.state.newCity}
                         newCitySlug={this.state.newCitySlug}
                         currencyType={this.state.currencyType}
                         rentPercentChange={this.state.rentPercentChange}
                         groceriesPercentChange={this.state.groceriesPercentChange}
                         restaurantPercentChange={this.state.restaurantPercentChange}
                         purchasingPercentChange={this.state.purchasingPercentChange}
                         resetToFirstStep={this.resetToFirstStep}/>
    }
  }
}

export default App;
