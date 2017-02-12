import React from 'react';
import Cities from './SubComponents/Cities.js';

let intro = {
	color: '#FFF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '30px',
	textAlign: 'center'
}

let menu_button_container = {
	position: 'absolute',
    zIndex: '999',
    top: '10px',
    left: '5px'
}

let result_text = {
	color: '#FFF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '30px',
	textAlign: 'center',
	marginTop: '32px',
	fontWeight: '200'
}

let buttons_overlay = {
	textAlign: 'center'
}

let previous_button_overlay = {
	display: 'inline-block'
}

let next_button_overlay = {
	display: 'inline-block'
}

let hidden_button = {
	color: '#2c3338',
    borderRadius: '60px',
    padding: '22.5px',
    background: '#2c3338',
    margin: '10px'
}

let hidden_text = {
	fontSize: '30px',
	marginTop: '32px'
}

class CityDropDownComponent extends React.Component {

	constructor(props) {
		super(props);
		this.getSelectedFromProps = this.getSelectedFromProps.bind(this);

		this.state = {selected: this.getSelectedFromProps(this.props)};
		this.checkIfCityExists = this.checkIfCityExists.bind(this);

	}

	getSelectedFromProps(props) {
		var selected
		if (props.value === null && props.option.length !== 0) {
			selected = props.options[0][props.valueField];
		} else {
			selected = props.value;
		}
		return selected;
	}

	componentWillReceiveProps(props) {
		const selected = this.getSelectedFromProps(props);
		this.setState({selected: selected});
	}

	checkIfCityExists () {
		const dataSet = require('../data/cost_of_living_indices.json');
		return (dataSet[(this.state.selected)] !== undefined);
	}

	render () {
		return (
			<div className="aligner">
				<div style={menu_button_container}>
					<button className='continue-button' onClick={this.props.resetToFirstStep}>Menu</button>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							{(this.props.stepNumber === 2) && <p style={intro}>What city do you currently live in?</p>}
							{(this.props.stepNumber === 4) && <p style={intro}>What city do you wish to live in?</p>}
							
							<Cities label="States" onChange={this.props.onChange} searchable />

							{(this.state.selected === '') && <p style={hidden_text}>.</p>}
							{((this.state.selected === '') && this.props.stepNumber === 2) && <div style={hidden_button}></div>}
							{(this.state.selected !== '') && <p style={result_text}>{this.state.selected}</p>}
							
							<div style={buttons_overlay}>
								{(this.props.stepNumber === 4) && <div style={previous_button_overlay}>
									<i className="fa fa-arrow-left arrow-button" onClick={this.props.previousStep} aria-hidden="true"></i>
								</div>}

								{(this.checkIfCityExists()) && <div style={next_button_overlay}>
									{<i className="fa fa-arrow-right arrow-button" onClick={this.props.nextStep} aria-hidden="true"></i>}
								</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CityDropDownComponent;