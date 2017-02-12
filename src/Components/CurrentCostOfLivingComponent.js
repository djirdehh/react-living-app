import React from 'react';

let intro = {
	color: '#FFF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '30px',
	textAlign: 'center'
}

let intro_annual = {
	fontWeight: '600',
	cursor: 'pointer'
}

let menu_button_container = {
	position: 'absolute',
    zIndex: '999',
    top: '10px',
    left: '5px'
}

let menu_button = {
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
    color: '#FFF',
    backgroundColor: '#ea4c88',
    borderColor: '#ea4c88',
    margin: '0 10px'
}

let input_overlay = {
	textAlign: 'center'
}

let select = {
	width: '75px',
    paddingLeft: '1em',
    height: '40px',
    color: 'rgb(59, 59, 59)',
    backgroundColor: '#FFF',
    fontSize: '15px',
    display: 'inline-block',
    cursor: 'pointer',
    WebkitAppearance: 'none', 
    MozAppearance: 'none' 
}

let input = {
	width: '200px',
    paddingLeft: '1em',
    border: 'none',
    outline: '0',
    height: '40px',
    color: '#3B3B3B',
    fontSize: '15px',
    display: 'inline-block',
    marginLeft: '10px'
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

class CurrentCostOfLivingComponent extends React.Component {

	render () {
		return (
			<div className="aligner">	
				<div style={menu_button_container}>
					<button style={menu_button} onClick={this.props.resetToFirstStep}>Menu</button>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<p style={intro}>What's your current 
								<span style={intro_annual} className='tooltip-top' data-tooltip='The comparison assumes net earnings after income tax!'> annual </span> 
							salary?</p>
							<div style={input_overlay}>
								<select style={select} value={this.props.currencyValue} onChange={this.props.onChangeOfCurrencyType}>
									<option>{this.props.currencyValue}</option>
								</select>
								<input style={input} type='number' value={this.props.value} onChange={this.props.onChange}/>
							</div>
							<p style={result_text}>Result: {this.props.currencyValue} {this.props.value}</p>

							<div style={buttons_overlay}>
								<div style={previous_button_overlay}>
									<i className="fa fa-arrow-left arrow-button" onClick={this.props.previousStep} aria-hidden="true"></i>
								</div>
								{(this.props.value !== "") && <div style={next_button_overlay} onClick={this.props.nextStep}>
									<i className="fa fa-arrow-right arrow-button" onClick={this.props.nextStep} aria-hidden="true"></i>
								</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CurrentCostOfLivingComponent;