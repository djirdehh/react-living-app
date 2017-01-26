import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';

let RenderedApp;

describe('App', () => {
  beforeEach( () => {
    const div = document.createElement('div');
    RenderedApp = ReactDOM.render(<App />, div);
  });

  it('renders', () => {
    expect(RenderedApp).toBeInstanceOf(App);
  });

  it('sets nextStep from 1 to 2 correctly', () => {
    RenderedApp.nextStep();
    expect(RenderedApp.state.step).toBe(2);
  });

  it('resetToFirstStep when called', () => {
    RenderedApp.nextStep();
    RenderedApp.resetToFirstStep();
    expect(RenderedApp.state.step).toBe(1);
  });

  it('sets previousStep from 2 to 1 correctly', () => {
    RenderedApp.nextStep();
    RenderedApp.previousStep();
    expect(RenderedApp.state.step).toBe(1);
  });

  it('sets previousStep from 1 to 1 correctly', () => {
    RenderedApp.nextStep();
    RenderedApp.previousStep();
    RenderedApp.previousStep();
    expect(RenderedApp.state.step).toBe(1);
  });

});
