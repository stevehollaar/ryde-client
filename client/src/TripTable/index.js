import React, { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';
import { autobind } from 'core-decorators';
import moment from 'moment';
import numeral from 'numeral';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import TripTableRow from 'TripTableRow';
import PaymentMethod from 'PaymentMethod';

const FIELDS = [
  {
    label: 'Pickup',
    property: 'pickup_time',
    render: prop => moment(prop).format('YYYY/MM/DD'),
    filterMatch: (prop, input) => moment(prop).format('YYYY/MM/DD').indexOf(input) >= 0,
  },
  {
    label: 'Driver',
    property: 'driver',
    render: prop => prop.get('name'),
    filterMatch: (prop, input) =>
      prop.get('name').toLowerCase().indexOf(input) >= 0,
  },
  {
    label: 'Fare',
    property: 'fare',
    render: prop => numeral(prop).format('$0.00'),
    rightAlign: true,
  },
  {
    label: 'Car',
    property: 'car',
    render: prop => prop.get('type'),
    filterMatch: (prop, input) =>
      prop.get('type').toLowerCase().indexOf(input.toLowerCase()) >= 0,
  },
  {
    label: 'City',
    property: 'city',
    render: prop => prop,
    filterMatch: (prop, input) => prop.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  },
  {
    label: 'Payment Method',
    property: 'payment_method',
    render: prop => <PaymentMethod {...prop.toObject()} />,
    filterMatch: (prop, input) => (
      prop.get('card_type').toLowerCase().indexOf(input) >= 0 ||
      prop.get('last_four').toLowerCase().indexOf(input) >= 0
    ),
  },
];

@CSSModules(styles)
export default class TripTable extends PureComponent {
  static propTypes = {
    trips: PropTypes.instanceOf(Immutable.List).isRequired,
  };

  constructor() {
    super();

    this.state = {
      filterInput: '',
      orderFieldIndex: 0,
      orderAscending: true,
    };
  }

  @autobind
  onFilterInputChange(event) {
    this.setState({
      filterInput: event.currentTarget.value,
    });
  }

  @autobind
  onHeaderCellClick(orderFieldIndex) {
    if (orderFieldIndex === this.state.orderFieldIndex) {
      this.setState({ orderAscending: !this.state.orderAscending });
    } else {
      this.setState({
        orderFieldIndex,
        orderAscending: true,
      });
    }
  }

  filterTrips(trips) {
    const {
      filterInput,
    } = this.state;

    if (!filterInput) {
      return trips;
    }

    return trips.filter(trip =>
      FIELDS.some(({ property, filterMatch = () => false }) =>
        filterMatch(
          trip.get(property),
          filterInput.toLowerCase()
        )
      )
    );
  }

  orderTrips(trips) {
    const {
      orderFieldIndex,
      orderAscending,
    } = this.state;

    const { property } = FIELDS[orderFieldIndex];

    return trips.sort((a, b) => {
      if (a.get(property) > b.get(property)) {
        return orderAscending ? 1 : -1;
      } else if (a.get(property) < b.get(property)) {
        return orderAscending ? -1 : 1;
      }
      return 0;
    });
  }

  renderSortMarker(index) {
    const {
      orderFieldIndex,
      orderAscending,
    } = this.state;

    if (index === orderFieldIndex) {
      return orderAscending ? '▲' : '▼';
    }

    return null;
  }

  render() {
    const trips =
      this.filterTrips(
        this.orderTrips(
          this.props.trips
        )
      );

    const {
      filterInput,
      orderFieldIndex,
    } = this.state;

    return (
      <div>
        <div className={styles.filterContainer}>
          <label htmlFor="filter">
            Filter
          </label>
          <input
            name="filter"
            type="text"
            className={styles.filterInput}
            value={filterInput}
            onChange={this.onFilterInputChange}
          />
        </div>
        {trips.size > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                {FIELDS.map(({ label, rightAlign = false }, i) => (
                  <th
                    key={i}
                    className={rightAlign ? styles.rightHeaderCell : styles.headerCell}
                    onClick={() => this.onHeaderCellClick(i)}
                  >
                    {label}
                    <span className={i === orderFieldIndex ? styles.sortActive : styles.sort}>
                      {this.renderSortMarker(i)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, i) => (
                <TripTableRow
                  key={i}
                  fields={FIELDS}
                  {...trip.toObject()}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results for "{filterInput}"</p>
        )}
      </div>
    );
  }
}
