import React from 'react';
import react_logo from '../../logo.svg';

class FooterComponent extends React.Component {
	render () {
		return (
			<div className="footer">
				<div className='footer-description1'><span className='footer-name-text'>Hassan Djirdeh | </span>© <span className='footer-name-text'> {(new Date().getFullYear())} .</span></div>
				<div className='footer-description2'>Built with <a href="https://facebook.github.io/react/"
				target="_blank" className="footer-link-description">React</a> <img src={react_logo} className='footer-logo' alt='React Logo'/></div>
				<div className='footer-social-media'>
					<a href="http://hassandjirdeh.com" target="_blank" className="social_links">
				        <i id="social-link" className="fa fa-h-square fa-2x social" aria-hidden="true"></i>
				    </a>
				    <a href="https://github.com/djirdehh" target="_blank" className="social_links">
				        <i id="social-link" className="fa fa-github-square fa-2x social" aria-hidden="true"></i>
				    </a>
					<a href="https://ca.linkedin.com/in/hassandjirdeh" target="_blank" className="social_links">
				        <i id="social-link" className="fa fa-linkedin-square fa-2x social" aria-hidden="true"></i>
				     </a>
				    <a href="mailto:hassan.djirdeh@mail.utoronto.ca" target="_blank" className="social_links">
				    	<i id="social-em" className="fa fa-envelope-square fa-2x social"></i>
				    </a>
				</div>
			</div>
		);
	}
}

export default FooterComponent;
