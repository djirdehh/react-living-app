import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.png';
import teleport_logo from '../teleport_logo.svg';
import react_logo from '../logo.svg';

let padding_outline = {
  padding: '20px'
}

let logo_properties = {
  height: '70px',
  display: 'block',
  margin: '0 auto'
}

let intro = {
  color: '#E94A87',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '25px',
  fontWeight: '700',
  textAlign: 'center',
  margin: '5px'
}

let description = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: '14px',
  textAlign: 'center',
  marginTop: 0,
  marginBottom: '25px'
}

let sub_intro = {
  color: '#E94A87',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  fontWeight: '700',
  textAlign: 'center',
  margin: '5px'
}

let link = {
  color: '#E94B87',
  fontWeight: '700',
  textDecoration: 'none'
}

let buttons_container = {
  width: '100%',
  textAlign: 'center'
}

let details_button = {
  height: '38px',
    padding: '0 15px',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '38px',
    letterSpacing: '.1rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    border: '1px solid #bbb',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: '0px auto',
    color: '#ea4c88',
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    margin: '0 10px'
}

let continue_button = {
  height: '38px',
    padding: '0 15px',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '38px',
    letterSpacing: '.1rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    border: '1px solid #bbb',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: '0px auto',
    color: '#FFF',
    backgroundColor: '#ea4c88',
    borderColor: '#ea4c88',
    margin: '0 10px'
}

class WelcomeDetailsComponent extends React.Component {

  render() {
    return (
        <div className="none-aligner">
          <div className="container welcome-details-block">
            <div className="row">
              <div style={padding_outline} className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <img src={logo} style={logo_properties} />
                <h3 style={intro}>The Cost Of Living App</h3>
                <p style={description}> The cost-of-living index, attributed to Russian economist A. A. Konüs, is a theoretical price index that measures 
                  the relative cost of living over time (or regions). The COF index has been widely used to show the difference in living between cities
                  and is the basis for this application.
                </p>
                <h3 style={sub_intro}>Cost Of Living Data</h3>
                  <img src={teleport_logo} style={logo_properties} />
                <p style={description}> The cost of living indices for the various cities were obtained from the largest free database of user contributed data 
                  about cities and countries worldwide <a style={link} href="https://www.numbeo.com/cost-of-living/">Numbeo</a><br /><br />
                  Further data with regards to income and living costs were obtained through <a style={link} href="https://developers.teleport.org/api/">Teleport's </a>
                  Public API's. <a style={link} href="https://developers.teleport.org/">Teleport</a> is the largest and most up-to-date quality of life database and provide 
                  their API's for the public to use.
                </p>
                <h3 style={sub_intro}>React</h3>
                  <img src={react_logo} className='App-logo'/>
                <p style={description}> This simple app marks my first foray into component oriented development and served as a great learning
                experience in learning the main concepts behind React. React on it's own wouldn't generally be suitable for a fully scaled application but it handled well
                for a simple app like this.
                </p>
                <div style={buttons_container}>
                  <button style={continue_button} onClick={this.props.closeDetails}>Return</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default WelcomeDetailsComponent;