import React from 'react';
import FooterComponent from './SubComponents/FooterComponent.js';
import WelcomeDetailsComponent from './SubComponents/WelcomeDetailsComponent.js';
import logo from '../logo.png';

let inherit_height = {
	height: 'inherit'
}

let primary_color = {
	color: 'rgb(234, 76, 136)'
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
    color: '#ea4c88',
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    margin: '0 10px'
}

class WelcomeComponent extends React.Component {

	constructor () {
		super();

		this.state = { openDetails: false};

		this.openDetails = this.openDetails.bind(this);
		this.closeDetails = this.closeDetails.bind(this);
	}

	openDetails () {
		this.setState({	
			openDetails: true 
		});
	}

	closeDetails () {
		this.setState({
			openDetails: false
		});
	}

	render () {
		return (
			<div style={inherit_height}>
				{(!this.state.openDetails) && <div className="aligner">
					<div>
						<div className='welcome-block'>
							<img src={logo} className='welcome-logo' alt='logo' />
							<h3 className='welcome-intro'>citii.<span style={primary_color}>io</span></h3>
							<p className='welcome-description'> Ever thought how far your current salary will go in another city?
							This simple app will calculate how much more (or less) you would need in order
							to maintain the same standard of living in another city!
							</p>
							<div style={buttons_container}>
							<button style={details_button} onClick={this.openDetails}>Details</button>
							<button className='continue-button' onClick={this.props.nextStep}>Start</button>
							</div>
						</div>
					</div>
					<FooterComponent />
				</div>}
				{(this.state.openDetails) && <WelcomeDetailsComponent closeDetails={this.closeDetails}/>}
			</div>	
		);
	}
}

export default WelcomeComponent;