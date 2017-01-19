import React from 'react';

let full_page_height = {
	height: '100%'
}

let image_container = {
	position: 'relative'
}

let middle_container = {
	position: 'relative',
	padding: '30px'
}

let final_container = {
	position: 'relative',
	textAlign: 'center',
	height: '20vh'
}

let upper_portion_div = {
	width: '100%'
}

let intro = {
	color: '#FFF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '25px',
	fontWeight: '700px',
	textAlign: 'center',
	marginTop: '1rem',
	marginBottom: '0'
}

let up_comparable_salary_text = {
	color: '#3DF2FF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '50px',
	textAlign: 'center',
	marginBottom: '3rem'
}

let down_comparable_salary_text = {
	color: 'rgb(234, 76, 136)',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '50px',
	textAlign: 'center',
	marginBottom: '3rem'
}

let card_index = {
	background: 'rgb(44, 51, 56)',
    padding: '20px',
    width: '250px',
    display: 'block',
    margin: '0 auto'
}

let sub_salary_text = {
	color: 'antiquewhite',
	textAlign: 'center',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '20px',
	fontWeight: '700',
	marginBottom: '0',
	paddingTop: '10px',
	display: 'block',
	margin: '0 auto'
}

let purchasing_power_text = {
	color: 'antiquewhite',
	textAlign: 'center',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '20px',
	fontWeight: '700',
	marginBottom: '0',
	paddingTop: '10px',
	display: 'block',
	margin: '0 auto'
}

let icon_index = {
	display: 'block',
	margin: '0 auto'
}

let percent_index_text = {
	color: 'antiquewhite',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '30px',
	textAlign: 'center',
	width: '50%',
	marginBottom: '0',
	display: 'block',
	margin: '0 auto'
}

let up_arrow_index = {
	color: 'rgb(61, 242, 255)',
	fontSize: '20px',
	marginLeft: '3px'
}

let down_arrow_index = {
	color: 'rgb(234, 76, 136)',
	fontSize: '20px',
	marginLeft: '3px'
}

let super_script = {
	verticalAlign: 'super',
	fontSize: '15px'
}

let random_section = {
	position: 'absolute',
	width: '100%',
	bottom: '30%',
	left: '0'
}

let random_salary_number = {
	color: '#EA4C88',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '20px',
	fontWeight: '700',
	display: 'inline-block',
	paddingLeft: '5px'
}

let buttons_container = {
	position: 'absolute',
    zIndex: '999',
    top: '10px',
    left: '5px'
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

class NewCostOfLivingComponent extends React.Component {

	constructor (props) {
		super(props);

		if (this.props.newCitySlug) {		
			var xhReq3 = new XMLHttpRequest();
			xhReq3.open("GET", 'https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/salaries/', false);
			xhReq3.send(null);
			var jsonObject3 = JSON.parse(xhReq3.responseText);
			var randomSalaryObject = jsonObject3.salaries[Math.floor(Math.random()*jsonObject3.salaries.length)];
			var randomPosition = randomSalaryObject.job.title;
			var randomSalary = randomSalaryObject.salary_percentiles.percentile_50;
			var roundedRandomSalary = (Math.round(randomSalary/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			this.state = {
				listOfSalaries: jsonObject3,
				position: randomPosition,
				salary: roundedRandomSalary
			}
		}

		this.changePosition = this.changePosition.bind(this);
	}

	changePosition () {
		let randomPositionObject = this.state.listOfSalaries.salaries[Math.floor(Math.random()*this.state.listOfSalaries.salaries.length)];
		let randomPosition = randomPositionObject.job.title;
		let randomSalary = randomPositionObject.salary_percentiles.percentile_50;
		let roundedRandomSalary = (Math.round(randomSalary/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		this.setState({
			position: randomPosition,
			salary: roundedRandomSalary
		})
	}

	render () {
		let cost_of_living_increase_format;
		let rentPercentChange;
		let rent_increase_format;
		let groceriesPercentChange;
		let groceries_increase_format;
		let restaurantPercentChange;
		let restaurant_increase_format;
		let purchasingPercentChange;
		let purchasing_increase_format;
		let image_url;
		let summary;

		if (this.props.value > this.props.currentCostOfLiving) {
			cost_of_living_increase_format  = true;
		} else if (this.props.value < this.props.currentCostOfLiving) {
			cost_of_living_increase_format = false;
		}

		if (this.props.rentPercentChange > 0) {
			rentPercentChange = this.props.rentPercentChange;
			rent_increase_format = true;
		} else if (this.props.rentPercentChange < 0) {
			rentPercentChange = -(this.props.rentPercentChange);
			rent_increase_format = false;
		}

		if (this.props.groceriesPercentChange > 0) {
			groceriesPercentChange = this.props.groceriesPercentChange;
			groceries_increase_format = true;
		} else if (this.props.groceriesPercentChange < 0) {
			groceriesPercentChange = -(this.props.groceriesPercentChange);
			groceries_increase_format = false;
		}

		if (this.props.restaurantPercentChange > 0) {
			restaurantPercentChange = this.props.restaurantPercentChange;
			restaurant_increase_format = true;
		} else if (this.props.restaurantPercentChange < 0) {
			restaurantPercentChange = -(this.props.restaurantPercentChange);
			restaurant_increase_format = false;
		}

		if (this.props.purchasingPercentChange > 0) {
			purchasingPercentChange = this.props.purchasingPercentChange;
			purchasing_increase_format = true;
		} else if (this.props.purchasingPercentChange < 0) {
			purchasingPercentChange = -(this.props.purchasingPercentChange);
			purchasing_increase_format = false;
		}

		if (this.props.newCitySlug) {
			var xhReq = new XMLHttpRequest();
			xhReq.open("GET", 'https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/images/', false);
			xhReq.send(null);
			var jsonObject = JSON.parse(xhReq.responseText);
			image_url = jsonObject.photos[0].image.web;

			var xhReq2 = new XMLHttpRequest();
			xhReq2.open("GET", 'https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/scores/', false);
			xhReq2.send(null);
			var jsonObject2 = JSON.parse(xhReq2.responseText);
			summary = jsonObject2.summary;
			var div = document.createElement("div");
			div.innerHTML = summary;
			var text = div.textContent || div.innerText || "";
			var text_split = text.split(".")[0];
		}

		if (!this.props.newCitySlug) {
			image_url = 'http://www.freewebheaders.com/wordpress/wp-content/gallery/artistic-abstract/colored-flare-beams-abstract-art-web-header.jpg'
		}

		return (
			<div style={full_page_height}>
				<div style={buttons_container}>
					<button style={continue_button} onClick={this.props.resetToFirstStep}>Menu</button>
				</div>

				<div style={full_page_height}>
					<div style={image_container} className="background-darken">
						<img src={image_url} style={{width: '100%', opacity: '0.3', 'height': '30vh'}}/>
						<div className="banner-image-intro">{this.props.newCity}<br/>
						{(this.props.newCitySlug) && <span className="banner-image-sub-intro">{text_split}.</span>}
						</div>
					</div>
					<div style={middle_container} className="container">
						<p style={intro}>To have the same standard of living, a comparable salary would be</p>
							<p style={up_comparable_salary_text}>≈ {this.props.currencyType} {this.props.value}</p>
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-home fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Rent/Living</p>
								{(rent_increase_format) && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Rent is '+rentPercentChange+'% higher in '+this.props.newCity+' !'}> {rentPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!rent_increase_format) && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Rent is '+rentPercentChange+'% lower in '+this.props.newCity+' .'}> {rentPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-shopping-cart fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Groceries</p>
								{groceries_increase_format && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Groceries are '+groceriesPercentChange+'% higher in '+this.props.newCity+' !'} > {groceriesPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!groceries_increase_format) && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Groceries are '+groceriesPercentChange+'% lower in '+this.props.newCity+' .'} > {groceriesPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-cutlery fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Dining Out</p>
								{restaurant_increase_format && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Dining out is about '+restaurantPercentChange+'% higher in '+this.props.newCity+' !'} > {restaurantPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!restaurant_increase_format) && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Dining out is about '+restaurantPercentChange+'% lower in '+this.props.newCity+' .'} > {restaurantPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-star fa fa-lg-modification"></i></span>
								</div>
								<p style={purchasing_power_text}>Purchasing Power</p>
								{purchasing_increase_format && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Purchasing Power (i.e. the number of of goods/services that can be purchased by a unit of currency) is '+purchasingPercentChange+'% higher in '+this.props.newCity+' .'} > {purchasingPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!purchasing_increase_format) && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Purchasing Power (i.e. the number of of goods/services that can be purchased by a unit of currency) is '+purchasingPercentChange+'% lower in '+this.props.newCity+' !'} > {purchasingPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
							</div>
						</div>
					</div>
					{(this.props.newCitySlug) && <div style={final_container} className="container">
						<div style={random_section}>
							<p className='random-salary-text'>The median salary for a/an 
								<span className='random-position tooltip-top' onClick={this.changePosition}
								data-tooltip='Click for another occupation!'> {this.state.position} 
									<span style={super_script}> <i className="fa fa-user" aria-hidden="true"></i> </span>
								</span> 
							in {this.props.newCity} is around <span className='random-salary'>${this.state.salary}</span></p>
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

export default NewCostOfLivingComponent;