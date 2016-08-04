import React, { PropTypes, PureComponent } from 'react';
import CSSModules from 'react-css-modules';
import Immutable from 'immutable';
import styles from './styles.css';

@CSSModules(styles)
export default class TripTableRow extends PureComponent {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        property: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired,
        rightAlign: PropTypes.bool,
      }).isRequired,
    ).isRequired,
    car: PropTypes.instanceOf(Immutable.Map).isRequired,
    city: PropTypes.string.isRequired,
    driver: PropTypes.instanceOf(Immutable.Map).isRequired,
    fare: PropTypes.number.isRequired,
    payment_method: PropTypes.instanceOf(Immutable.Map).isRequired,
    pickup_time: PropTypes.string.isRequired,
  };

  render() {
    return (
      <tr>
        {this.props.fields.map(({ property, render, rightAlign = false }, i) => (
          <td
            key={i}
            className={rightAlign ? styles.rightCell : styles.cell}
          >
            {render(this.props[property])}
          </td>
        ))}
      </tr>
    );
  }
}
