import React, {Component} from 'react';
import { connect } from 'react-redux';

import { increment } from './actions';

class App extends Component {
  render() {
    return (
      <div>
        Count is: {this.props.counter}
        <button onClick={this.props.increment}>Increment</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { counter: state.counter };
}

export default connect(mapStateToProps, { increment })(App);
