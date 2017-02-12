import React from 'react';

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

class SpotAHomeDetailsComponent extends React.Component {

  render() {
    let image_container_class;
    let launch_image_class;
    let city_url;
    let housing_number;

    if(this.props.newCity === 'Madrid, Spain') {
      image_container_class = 'image-container-madrid';
      launch_image_class = 'launch-image-madrid';
      city_url = 'madrid';
      housing_number = 'thousands';
    } else if (this.props.newCity === 'Barcelona, Spain') {
      image_container_class = 'image-container-barcelona';
      launch_image_class = 'launch-image-barcelona';
      city_url = 'barcelona';
      housing_number = 'thousands';
    } else if (this.props.newCity === 'Bilbao, Spain') {
      image_container_class = 'image-container-bilbao';
      launch_image_class = 'launch-image-bilbao';
      city_url = 'bilbao';
      housing_number = 'dozens';
    } else if (this.props.newCity === 'Valencia, Spain') {
      image_container_class = 'image-container-valencia';
      launch_image_class = 'launch-image-valencia';
      city_url = 'valencia';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Granada, Spain') {
      image_container_class = 'image-container-granada';
      launch_image_class = 'launch-image-granada';
      city_url = 'granada';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Seville, Spain') {
      image_container_class = 'image-container-seville';
      launch_image_class = 'launch-image-seville';
      city_url = 'seville';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Brussels, Belgium') {
      image_container_class = 'image-container-brussels';
      launch_image_class = 'launch-image-brussels';
      city_url = 'brussels';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'London, United Kingdom') {
      image_container_class = 'image-container-london';
      launch_image_class = 'launch-image-london';
      city_url = 'london';
      housing_number = 'thousands';
    } else if (this.props.newCity === 'Rome, Italy') {
      image_container_class = 'image-container-rome';
      launch_image_class = 'launch-image-rome';
      city_url = 'rome';
      housing_number = 'thousands';
    } else if (this.props.newCity === 'Milan, Italy') {
      image_container_class = 'image-container-milan';
      launch_image_class = 'launch-image-milan';
      city_url = 'milan';
      housing_number = 'thousands';
    } else if (this.props.newCity === 'Paris, France') {
      image_container_class = 'image-container-paris';
      launch_image_class = 'launch-image-paris';
      city_url = 'paris';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Lyon, France') {
      image_container_class = 'image-container-lyon';
      launch_image_class = 'launch-image-lyon';
      city_url = 'lyon';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Dublin, Ireland') {
      image_container_class = 'image-container-dublin';
      launch_image_class = 'launch-image-dublin';
      city_url = 'dublin';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Dubai, United Arab Emirates') {
      image_container_class = 'image-container-dubai';
      launch_image_class = 'launch-image-dubai';
      city_url = 'dubai';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Berlin, Germany') {
      image_container_class = 'image-container-berlin';
      launch_image_class = 'launch-image-berlin';
      city_url = 'berlin';
      housing_number = 'hundreds';
    } else if (this.props.newCity === 'Vienna, Austria') {
      image_container_class = 'image-container-vienna';
      launch_image_class = 'launch-image-vienna';
      city_url = 'vienna';
      housing_number = 'dozens';
    }

    return (
      <div className="full-screen-banner">
        <div className="return-section">
                <div className="return-text" onClick={this.props.closeSpotAHomeDetails}>
                  <button style={continue_button}><i className="fa fa-arrow-left" aria-hidden="true"></i><span> Return</span></button>
                </div>
        </div>
        <div className={image_container_class}>
          <div>
          <div className="header-title">Discover {housing_number} of mid to long term housing options in {this.props.newCity} with <span style={{fontWeight: '700'}}>Spotahome</span>, 
          one of the largest online direct booking platforms that currently operates in 16 cities <span style={{fontWeight: '600'}}>worldwide</span>.
          </div>
            <div className="launch-button" style={{display: 'block', margin: '0 auto', cursor: 'pointer'}}>
              <a href={'https://www.spotahome.com/'+city_url} target="_blank" style={{textDecoration: 'none'}}>
                <div className="launch-item">
                  <div className={launch_image_class}></div>
                  <div className="launch-count">Launch Spotahome</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotAHomeDetailsComponent;