import React, { PropTypes, PureComponent } from 'react';
import CSSModules from 'react-css-modules';
import VisaLogo from './visa.png';
import MastercardLogo from './mastercard.png';
import styles from './styles.css';

@CSSModules(styles)
export default class TripTableRow extends PureComponent {
  static propTypes = {
    card_type: PropTypes.string.isRequired,
    last_four: PropTypes.string.isRequired,
  };

  render() {
    let logo = null;
    if (this.props.card_type === 'Visa') {
      logo = VisaLogo;
    } else if (this.props.card_type === 'Mastercard') {
      logo = MastercardLogo;
    }

    return (
      <span className={styles.main}>
        {logo ?
          <img
            src={logo}
            alt={this.props.card_type}
            className={styles.image}
          />
          : null}
        {' •••• '}
        {this.props.last_four}
      </span>
    );
  }
}
