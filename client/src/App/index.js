import React, { PureComponent } from 'react';
import TripDataProvider from 'TripDataProvider';
import TripTable from 'TripTable';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

@CSSModules(styles)
export default class App extends PureComponent {
  render() {
    return (
      <div className={styles.app}>
        <h1 className={styles.header}>My Trips</h1>
        <TripDataProvider>
          {({ trips, isFetching, isError }) => (
            <div>
              {isFetching ? 'Loading...' : null}
              {isError ? 'Error loading trips.' : null}
              {trips ?
                <TripTable trips={trips} />
              : null}
            </div>
          )}
        </TripDataProvider>
      </div>
    );
  }
}
