import React from 'react';
import WelcomeComponent from './WelcomeComponent'
import CurrentCostOfLivingComponent from './CurrentCostOfLivingComponent'
import CityDropDownComponent from './CityDropDownComponent'
import NewCostOfLivingComponent from './NewCostOfLivingComponent'

class App extends React.Component {

  state = {
    step: 1,
    currentCostOfLiving: '',
    currencyType: 'USD',
    currentCity: '',
    newCity: '',
    newCitySlug: '',
    exactNewCostOfLivingValue: 0,
    newCostOfLiving: 0,
    rentPercentChange: 0,
    groceriesPercentChange: 0,
    restaurantPercentChange: 0,
    purchasingPercentChange: 0,
    refreshCity: false
  };

  handleCurrentCostOfLivingInput = (e) => {
    this.setState({
      currentCostOfLiving: e.target.value
    });
  }

  handleCurrencyType = (e) => {
    this.setState({
      currencyType: e.target.value
    })
  }

  handleCurrentCity = (e) => {
    let currencyType;
    const dataSet = require('../data/cost_of_living_indices.json');

    if (e !== undefined) {
      currencyType = dataSet[e].currency_type;
    }

    this.setState({
      currentCity: e,
      currencyType: currencyType
    });
  }

  handleNewCity = (e) => {
    this.setState({
      newCity: e
    });
  }

  handleRefreshCity = (e) => {
    this.setState({
      newCity: e,
      refreshCity: true
    },
    function () {
      this.calculateNewCostOfLivingAndNextStep();

      this.setState({
        refreshComponent: !(this.state.refreshComponent)
      });
    });
  }

  calculateNewCostOfLivingAndNextStep = () => {
    const currentCostOfLiving = Number(this.state.currentCostOfLiving);
    const currentCity = this.state.currentCity;
    const newCity = this.state.newCity;

    let newCostOfLiving;
    let rentPercentChange;
    let groceriesPercentChange;
    let restaurantPercentChange;
    let purchasingPercentChange;

    const dataSet = require('../data/cost_of_living_indices.json');

    if (dataSet[newCity].index !== dataSet[currentCity].index) {
      let fractionalChange = ((dataSet[newCity].index - dataSet[currentCity].index)/dataSet[currentCity].index);
      newCostOfLiving = (currentCostOfLiving + (currentCostOfLiving * fractionalChange));
    } else {
      newCostOfLiving = currentCostOfLiving;
    }

    rentPercentChange = Math.round(((dataSet[newCity].rent_index - dataSet[currentCity].rent_index)/dataSet[currentCity].rent_index) * 100);
    groceriesPercentChange = Math.round(((dataSet[newCity].groceries_index - dataSet[currentCity].groceries_index)/dataSet[currentCity].groceries_index) * 100);
    restaurantPercentChange = Math.round(((dataSet[newCity].restaurant_index - dataSet[currentCity].restaurant_index)/dataSet[currentCity].restaurant_index) * 100);
    purchasingPercentChange = Math.round(((dataSet[newCity].purchasing_index - dataSet[currentCity].purchasing_index)/dataSet[currentCity].purchasing_index) * 100);

    this.setState({
      newCitySlug: dataSet[newCity].slug,
      exactNewCostOfLivingValue: newCostOfLiving,
      newCostOfLiving: (Math.round(newCostOfLiving/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      rentPercentChange: rentPercentChange,
      groceriesPercentChange: groceriesPercentChange,
      restaurantPercentChange: restaurantPercentChange,
      purchasingPercentChange: purchasingPercentChange
    });

    if (!this.state.refreshCity) {
      this.nextStep();
    }
  }

  changeCurrencyTypeAndValue = (exactValue, value, newCurrencyType) => {
    this.setState({
      exactNewCostOfLivingValue: exactValue,
      newCostOfLiving: value,
      currencyType: newCurrencyType
    })
  }

  nextStep = () => {
    this.setState({
      step: this.state.step + 1 
    });
  }

  previousStep = () => {
    this.setState({
      step: this.state.step > 2
        ? this.state.step - 1
        : 1
    });
  }

  resetToFirstStep = () => {
    this.setState({
      step: 1,
      currentCostOfLiving: '',
      currencyType: 'USD',
      currentCity: '',
      newCity: '',
      newCitySlug: '',
      exactNewCostOfLivingValue: 0,
      newCostOfLiving: 0,
      rentPercentChange: 0,
      groceriesPercentChange: 0,
      restaurantPercentChange: 0,
      purchasingPercentChange: 0,
      refreshCity: false
    })
  }

  render () {
    switch (this.state.step) {
      case 1:
        return <WelcomeComponent nextStep={this.nextStep} />
      case 2:
        return <CityDropDownComponent id='cityDropdown'
                      value={this.state.currentCity}
                      currencyType={this.state.currencyType} 
                      onChange={this.handleCurrentCity}
                      nextStep={this.nextStep}
                      previousStep={this.previousStep}
                      stepNumber={this.state.step}
                      resetToFirstStep={this.resetToFirstStep} />
      case 3:
        return <CurrentCostOfLivingComponent value={this.state.currentCostOfLiving} 
                      currencyValue={this.state.currencyType}
                      onChange={this.handleCurrentCostOfLivingInput} 
                      onChangeOfCurrencyType={this.handleCurrencyType}
                      nextStep={this.nextStep}
                      previousStep={this.previousStep}
                      resetToFirstStep={this.resetToFirstStep} />
      case 4:
        return <CityDropDownComponent id='cityDropdown'
                      value={this.state.newCity} 
                      onChange={this.handleNewCity}
                      nextStep={this.calculateNewCostOfLivingAndNextStep}
                      previousStep={this.previousStep}
                      stepNumber={this.state.step}
                      resetToFirstStep={this.resetToFirstStep} />
      case 5:
        return <NewCostOfLivingComponent key={this.state.refreshComponent}
                      value={this.state.newCostOfLiving}
                      exactNewCostOfLivingValue={this.state.exactNewCostOfLivingValue}
                      currentCostOfLiving={this.state.currentCostOfLiving}
                      currentCity={this.state.currentCity}
                      newCity={this.state.newCity}
                      newCitySlug={this.state.newCitySlug}
                      currencyType={this.state.currencyType}
                      rentPercentChange={this.state.rentPercentChange}
                      groceriesPercentChange={this.state.groceriesPercentChange}
                      restaurantPercentChange={this.state.restaurantPercentChange}
                      purchasingPercentChange={this.state.purchasingPercentChange}
                      resetToFirstStep={this.resetToFirstStep}
                      changeCurrencyTypeAndValue={this.changeCurrencyTypeAndValue}
                      handleNewCityFunction={this.handleNewCity}
                      handleRefreshCityFunction={this.handleRefreshCity} />
      default:
        return null;
    }
  }
}

export default App;
