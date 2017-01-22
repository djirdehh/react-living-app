import React from 'react';
import Select from 'react-select';

const STATES = require('../../data/states');

let section_width = {
	maxWidth: '450px',
	margin: '0 auto'
}

let select_margin_bottom = {
	marginBottom: '10px'
}

let align_middle = {
	textAlign: 'center'
}

let full_width = {
	width: '100%'
}

var StatesField = React.createClass({
	displayName: 'StatesField',
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},
	getDefaultProps () {
		return {
			label: 'States:',
			searchable: true,
		};
	},
	getInitialState () {
		return {
			region: 'ALL',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'Pick a Region and Search!',
			clearable: true,
		};
	},
	switchRegion (e) {
		var newregion = e.target.value;
		console.log('region changed to ' + newregion);
		this.setState({
			region: newregion,
			selectValue: null
		});
	},
	updateValue (newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
		this.props.onChange(newValue);
	},
	focusStateSelect () {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox (e) {
		let newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	render () {
		var options = STATES[this.state.region];
		options.sort( function( a, b ) {
		    a = a.value.toLowerCase();
		    b = b.value.toLowerCase();

		    return a < b ? -1 : a > b ? 1 : 0;
		});
		return (
			<div style={section_width} className="section">
				<Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />
			</div>
		);
	}
});


module.exports = StatesField;

	// <h3 className="section-heading">{this.props.label}</h3>

// <div style={{ marginTop: 14 }}>
// 					<button type="button" onClick={this.focusStateSelect}>Focus Select</button>
// 					<label className="checkbox" style={{ marginLeft: 10 }}>
// 						<input type="checkbox" className="checkbox-control" name="searchable" checked={this.state.searchable} onChange={this.toggleCheckbox}/>
// 						<span className="checkbox-label">Searchable</span>
// 					</label>
// 					<label className="checkbox" style={{ marginLeft: 10 }}>
// 						<input type="checkbox" className="checkbox-control" name="disabled" checked={this.state.disabled} onChange={this.toggleCheckbox}/>
// 						<span className="checkbox-label">Disabled</span>
// 					</label>
// 					<label className="checkbox" style={{ marginLeft: 10 }}>
// 						<input type="checkbox" className="checkbox-control" name="clearable" checked={this.state.clearable} onChange={this.toggleCheckbox}/>
// 						<span className="checkbox-label">Clearable</span>
// 					</label>
// 				</div>



// <div className="checkbox-list row">
// 					<div style={align_middle} className="col-md-4">
// 						<label style={full_width} className="checkbox">
// 							<input type="radio" className="checkbox-control" checked={this.state.region === 'NORTH_AMERICA'} value="NORTH_AMERICA" onChange={this.switchRegion}/>
// 							<span className="checkbox-label">North America</span>
// 						</label>
// 						<label style={full_width} className="checkbox">
// 							<input type="radio" className="checkbox-control" checked={this.state.region === 'SOUTH_AMERICA'} value="SOUTH_AMERICA" onChange={this.switchRegion}/>
// 							<span className="checkbox-label">South America</span>
// 						</label>
// 					</div>
// 					<div style={align_middle} className="col-md-4">
// 						<label style={full_width} className="checkbox">
// 							<input type="radio" className="checkbox-control" checked={this.state.region === 'EUROPE'} value="EUROPE" onChange={this.switchRegion}/>
// 							<span className="checkbox-label">Europe</span>
// 						</label>
// 						<label style={full_width} className="checkbox">
// 							<input type="radio" className="checkbox-control" checked={this.state.region === 'ASIA'} value="ASIA" onChange={this.switchRegion}/>
// 							<span className="checkbox-label">Asia</span>
// 						</label>
// 					</div>
// 					<div style={align_middle} className="col-md-4">
// 						<label style={full_width} className="checkbox">
// 							<input type="radio" className="checkbox-control" checked={this.state.region === 'AFRICA'} value="AFRICA" onChange={this.switchRegion}/>
// 							<span className="checkbox-label">Africa</span>
// 						</label>
// 						<label style={full_width} className="checkbox">
// 							<input type="radio" className="checkbox-control" checked={this.state.region === 'OCEANIA'} value="OCEANIA" onChange={this.switchRegion}/>
// 							<span className="checkbox-label">Oceania</span>
// 						</label>
// 					</div>
// 				</div>