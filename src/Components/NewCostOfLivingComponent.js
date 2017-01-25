import React from 'react';
import banner_image_url from '../sky_banner.png';

let full_page_height = {
	height: '100%'
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
    color: '#FFF',
    backgroundColor: '#ea4c88',
    borderColor: '#ea4c88',
    margin: '0 10px'
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

let intro = {
	color: '#FFF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '25px',
	fontWeight: '700px',
	textAlign: 'center',
	marginTop: '1rem',
	marginBottom: '0'
}

let comparable_salary_text = {
	color: '#3DF2FF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '50px',
	textAlign: 'center',
	marginBottom: '3rem'
}

let alternative_comparable_salary_text = {
	color: '#3DF2FF',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '50px',
	textAlign: 'center',
	marginBottom: '7rem'
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

let percent_index_text_no_change = {
	color: 'antiquewhite',
	fontFamily: 'Nunito, sans-serif',
	fontSize: '15px',
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

let random_section = {
	position: 'absolute',
	width: '100%',
	bottom: '30%',
	left: '0'
}

let super_script = {
	verticalAlign: 'super',
	fontSize: '15px'
}

class NewCostOfLivingComponent extends React.Component {

	constructor (props) {
		super(props);

		if (this.props.newCitySlug) {		
			this.state = {
				bannerImage: '',
				bannerIntro: '',
				listOfSalaries: '',
				position: '',
				salary: ''
			}
		}

		this.changePosition = this.changePosition.bind(this);
	}

	componentWillMount () {
		if (this.props.newCitySlug) {
			fetch('https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/images/')
	          .then((response) => {
		          	if (!response.ok) {
		          		throw Error('Something went wrong retreiving an image :(');
		          	}
		          	return response.json();
	        	})
	          .then((responseData) => {
		            this.setState({
						bannerImage: responseData.photos[0].image.web
					});
				})
	          .catch((error) => {
	          		console.log(error);
	        	});

	        fetch('https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/scores/')
	          .then((response) => {
	          		if (!response.ok) {
		          		throw Error('Something went wrong retreiving city information :(');
		          	}
		          	return response.json();
	        	})
	          .then((responseData) => {
		          	let divElement = document.createElement("div");
		          	divElement.innerHTML = responseData.summary;

		          	let textElement = divElement.textContent || divElement.innerText || "";
		          	let firstSentence = textElement.split(".")[0];

		          	this.setState({
		            	bannerIntro: firstSentence
		            });
				})
	          .catch((error) => {
	          		console.log(error);
	        	});

	        fetch('https://api.teleport.org/api/urban_areas/slug:'+this.props.newCitySlug+'/salaries/')
	          .then((response) => {
	        		if (!response.ok) {
		          		throw Error('Something went wrong retreiving city information :(');
		          	}
		          	return response.json();
	        	})
	          .then((responseData) => {
					let randomPosition = responseData.salaries[Math.floor(Math.random()*responseData.salaries.length)].job.title;
					let randomSalary = responseData.salaries[Math.floor(Math.random()*responseData.salaries.length)].salary_percentiles.percentile_50;
					let roundedRandomSalary = (Math.round(randomSalary/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		          	
		          	this.setState({
		          		listOfSalaries: responseData,
		            	position: randomPosition,
		            	salary: roundedRandomSalary
		            });
				})
	          .catch((error) => {
	          		console.log(error);
	        	});
	    }
	}

	changePosition () {
		let randomPosition = this.state.listOfSalaries.salaries[Math.floor(Math.random()*this.state.listOfSalaries.salaries.length)].job.title;
		let randomSalary = this.state.listOfSalaries.salaries[Math.floor(Math.random()*this.state.listOfSalaries.salaries.length)].salary_percentiles.percentile_50;
		let roundedRandomSalary = (Math.round(randomSalary/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		this.setState({
			position: randomPosition,
			salary: roundedRandomSalary
		})
	}

	render () {
		let rentPercentChange;
		let rent_increase_format;
		let groceriesPercentChange;
		let groceries_increase_format;
		let restaurantPercentChange;
		let restaurant_increase_format;
		let purchasingPercentChange;
		let purchasing_increase_format;

		if (this.props.rentPercentChange > 0) {
			rentPercentChange = this.props.rentPercentChange;
			rent_increase_format = true;
		} else if (this.props.rentPercentChange <= 0) {
			rentPercentChange = -(this.props.rentPercentChange);
			rent_increase_format = false;
		}

		if (this.props.groceriesPercentChange > 0) {
			groceriesPercentChange = this.props.groceriesPercentChange;
			groceries_increase_format = true;
		} else if (this.props.groceriesPercentChange <= 0) {
			groceriesPercentChange = -(this.props.groceriesPercentChange);
			groceries_increase_format = false;
		}

		if (this.props.restaurantPercentChange > 0) {
			restaurantPercentChange = this.props.restaurantPercentChange;
			restaurant_increase_format = true;
		} else if (this.props.restaurantPercentChange <= 0) {
			restaurantPercentChange = -(this.props.restaurantPercentChange);
			restaurant_increase_format = false;
		}

		if (this.props.purchasingPercentChange > 0) {
			purchasingPercentChange = this.props.purchasingPercentChange;
			purchasing_increase_format = true;
		} else if (this.props.purchasingPercentChange <= 0) {
			purchasingPercentChange = -(this.props.purchasingPercentChange);
			purchasing_increase_format = false;
		}

		return (
			<div style={full_page_height}>
				<div style={buttons_container}>
					<button style={continue_button} onClick={this.props.resetToFirstStep}>Menu</button>
				</div>

				<div style={full_page_height}>
					<div style={image_container} className="background-darken">
						{(this.props.newCitySlug) && <img src={this.state.bannerImage} style={{width: '100%', opacity: '0.4', 'height': '30vh'}} alt='City Banner'/>}
						{(!this.props.newCitySlug) && <img src={banner_image_url} style={{width: '100%', opacity: '0.7', 'height': '30vh'}} alt='Stock Banner'/>}
						{(this.props.newCitySlug) && <div className="banner-image-intro">{this.props.newCity}<br/>
							{(this.props.newCitySlug !== 'london') && <span className="banner-image-sub-intro">{this.state.bannerIntro}.</span>}
							{(this.props.newCitySlug === 'london') && <span className="banner-image-sub-intro">London is one of the world's most inviting cities for startups, as well as home to world-class schools, universities and museums.</span>}
						</div>}
						{(!this.props.newCitySlug) && <div className="alternative-banner-image-intro">{this.props.newCity}</div>}
					</div>
					<div style={middle_container} className="container">
						<p style={intro}>To have the same standard of living, a comparable salary would be</p>
							{(this.props.newCitySlug) && <p style={comparable_salary_text}>≈ {this.props.currencyType} {this.props.value}</p>}
							{(!this.props.newCitySlug) && <p style={alternative_comparable_salary_text}>≈ {this.props.currencyType} {this.props.value}</p>}
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-home fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Rent/Living</p>
								{(rent_increase_format) && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Rent is '+rentPercentChange+'% more expensive in '+this.props.newCity+'!'}> {rentPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!rent_increase_format && this.props.rentPercentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Rent is cheaper by '+rentPercentChange+'% in '+this.props.newCity+'.'}> {rentPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
								{(!rent_increase_format && this.props.rentPercentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom" 
								data-tooltip={'Rent is the same!'}> It's the same!
								</p>}
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-shopping-cart fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Groceries</p>
								{groceries_increase_format && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Groceries are '+groceriesPercentChange+'% more expensive in '+this.props.newCity+'!'} > {groceriesPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!groceries_increase_format && this.props.groceriesPercentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Groceries are cheaper by '+groceriesPercentChange+'% in '+this.props.newCity+'.'} > {groceriesPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
								{(!groceries_increase_format && this.props.groceriesPercentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom"
								data-tooltip={'Groceries are the same!'} > It's the same!
								</p>}
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-cutlery fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Dining Out</p>
								{restaurant_increase_format && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Dining out is '+restaurantPercentChange+'% more expensive in '+this.props.newCity+'!'} > {restaurantPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!restaurant_increase_format && this.props.restaurantPercentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom" 
								data-tooltip={'Dining out is cheaper by '+restaurantPercentChange+'% in '+this.props.newCity+'.'} > {restaurantPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
								{(!restaurant_increase_format && this.props.restaurantPercentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom" 
								data-tooltip={'Dining out is the same!'} > It's the same!
								</p>}
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 mobilePadding'>
								<div style={icon_index} id="icon-box">
	  								<span><i className="fa fa-star fa fa-lg-modification"></i></span>
								</div>
								<p style={sub_salary_text}>Purchasing Power</p>
								{purchasing_increase_format && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Purchasing Power (i.e. the number of of goods/services that can be purchased by a unit of currency) is '+purchasingPercentChange+'% higher in '+this.props.newCity+'.'} > {purchasingPercentChange}%
									<i style={down_arrow_index} className="fa fa-arrow-up" aria-hidden="true"></i>
								</p>}
								{(!purchasing_increase_format && this.props.purchasingPercentChange !== 0) && <p style={percent_index_text} className="tooltip-bottom"
								data-tooltip={'Purchasing Power (i.e. the number of of goods/services that can be purchased by a unit of currency) is '+purchasingPercentChange+'% lower in '+this.props.newCity+'!'} > {purchasingPercentChange}%
									<i style={up_arrow_index} className="fa fa-arrow-down" aria-hidden="true"></i>
								</p>}
								{(!purchasing_increase_format && this.props.purchasingPercentChange === 0) && <p style={percent_index_text_no_change} className="tooltip-bottom"
								data-tooltip={'The purchasing power is the same!'} > It's the same!
								</p>}
							</div>
						</div>
					</div>
					{(this.props.newCitySlug) && <div style={final_container} className="container">
						<div style={random_section}>
							<p className='random-salary-text'>The median salary for a/an&nbsp;
								<span className='random-position tooltip-top' onClick={this.changePosition}
								data-tooltip='Click for another occupation!'> {this.state.position} 
									<span style={super_script}> <i className="fa fa-user" aria-hidden="true"></i> </span>&nbsp;
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