import React from 'react';
import States from './States.jsx';

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

let select = {
	height: '40px',
	color: 'rgb(59, 59, 59)',
	background: 'rgb(245, 236, 217)',
	display: 'block',
	margin: '0 auto',
	maxWidth: '400px'
}

let result_text = {
	color: '#FFF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '30px',
	textAlign: 'center',
	marginTop: '32px'
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
    padding: '10px',
    background: '#2c3338',
    margin: '10px'
}

let hidden_text = {
	fontSize: '30px',
	marginTop: '32px'
}

let display_none = {
	display: 'none'
}

class CityDropDownComponent extends React.Component {

	constructor(props) {
		super(props);
		this.getSelectedFromProps = this.getSelectedFromProps.bind(this);

		this.state = {selected: this.getSelectedFromProps(this.props)};
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
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

	handleClick (e) {
		var input = e.target;
		var list = input.getAttribute('list');

		if (list) {
			input.setAttribute('data-list', list);
			input.removeAttribute('list');
		}
	}

	handleKeyDown (e) {
		var input = e.target;
		var list = input.getAttribute('data-list');

		if (list) {
			input.setAttribute('list', list);
			input.removeAttribute('data-list');
		}
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
				<a href="http://hassandjirdeh.com" target="_blank">
					<div className='name-section'>
						<p className='name-text'>Hassan Djirdeh</p>
					</div>
				</a>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							{(this.props.stepNumber === 2) && <p style={intro}>Which city do you currently live in?</p>}
							{(this.props.stepNumber === 4) && <p style={intro}>Which city do you want to live in?</p>}
							
							<States label="States" onChange={this.props.onChange} searchable />


							{(this.state.selected === '') && <p style={hidden_text}>.</p>}
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

CityDropDownComponent.propTypes = {
	id: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	valueField: React.PropTypes.string,
	labelField: React.PropTypes.string
};

CityDropDownComponent.defaultProps = {
	value: '',
	valueField: 'value',
	labelField: 'label'
};

export default CityDropDownComponent;