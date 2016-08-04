import React, { PureComponent } from 'react';
import TripDataProvider from 'TripDataProvider';

export default class App extends PureComponent {

  constructor() {
    super();
    this.state = {
      trips: null,

    };
  }

  render() {
    return (
      <div>
        <h1>My Trips</h1>
        <TripDataProvider>
          {({ trips, isFetching }) => (
            <div>
              {isFetching ? 'Loading...' : null}
              {trips ?
                <pre>
                  {JSON.stringify(trips, null, 2)}
                </pre>
              : null}
            </div>
          )}
        </TripDataProvider>
      </div>
    );
  }
}
