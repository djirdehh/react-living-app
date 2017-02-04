import React from 'react';
import Select from 'react-select';

const CITIES = require('../../data/cities');

let section_width = {
	maxWidth: '450px',
	margin: '0 auto'
}

var CitiesField = React.createClass({
	displayName: 'CitiesField',
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
			clearable: false,
		};
	},
	updateValue (newValue) {
		this.setState({
			selectValue: newValue
		});
		this.props.onChange(newValue);
	},
	render () {
		var options = CITIES[this.state.region];
		options.sort( function( a, b ) {
		    a = a.value.toLowerCase();
		    b = b.value.toLowerCase();

		    return a < b ? -1 : a > b ? 1 : 0;
		});
		return (
			<div style={section_width} className="section">
				{(!this.props.onLastPage) && <Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />}
				{(this.props.onLastPage) && <Select ref="stateSelect" options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />}
			</div>
		);
	}
});


module.exports = CitiesField;