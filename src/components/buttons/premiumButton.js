import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './PremiumButton.css';

class PremiumButton extends Component {
  render() {
    return (
      <a href={this.props.to} className="premium-button" target="_blank">
        <span>{this.props.text} &nbsp;</span>
        <span className="arrow">→</span>
      </a>
    );
  }
}

PremiumButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PremiumButton;