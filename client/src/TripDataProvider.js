import React, { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';

/**
 * Fetches trip data, and renders children as a function prop.
 */
export default class TripDataProvider extends PureComponent {
  static propTypes = {
    children:  PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isFetching: false,
      isError: false,
      trips: null,
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    fetch('/public/data/trips.json')
      .then(response => response.json())
      .then(trips => {
        this.setState({
          trips: Immutable.fromJS(trips),
          isFetching: false,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isError: true });
      });
  }

  render() {
    return this.props.children(this.state);
  }
}
