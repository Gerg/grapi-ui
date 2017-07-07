const {Actions} = require('p-flux');
const React = require('react');
const propTypes = require('prop-types');

class HomePage extends React.Component {
  static propTypes = {
    root: propTypes.any,
    accessToken: propTypes.string
  };

  fetch = () => {
    Actions.fetchGrapi(this.props.accessToken);
  };

  render() {
    const {root} = this.props;
    return (
      <div className="api-page">
        <button onClick={this.fetch}>Click Me</button>
        <div>{JSON.stringify(root)}</div>
      </div>
    );
  }
}

module.exports = HomePage;