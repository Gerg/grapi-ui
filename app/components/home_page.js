const {Actions} = require('p-flux');
const React = require('react');
const propTypes = require('prop-types');
const Viz = require('./viz');

class HomePage extends React.Component {
  static propTypes = {
    root: propTypes.any,
    config: propTypes.object,
    accessToken: propTypes.string
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {config: {apiUrl}, accessToken} = this.props;
    Actions.fetchGrapi({apiUrl, accessToken});
  };

  render() {
    const {accessToken, root} = this.props;
    if (!accessToken) return null;
    return (
      <div className="api-page">
        <button onClick={this.fetch}>Click Me</button>
        <Viz data={root.data}/>
      </div>
    );
  }
}

module.exports = HomePage;