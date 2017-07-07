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
    setInterval(() => {
      this.fetch();
    }, 5000);
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.root.data) !== JSON.stringify(this.props.root.data);
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
        <Viz data={root.data}/>
        <button onClick={this.fetch}>Refresh</button>
        <pre>{JSON.stringify(root.data, undefined, 2)}</pre>
      </div>
    );
  }
}

module.exports = HomePage;