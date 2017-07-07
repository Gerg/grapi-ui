const {Actions} = require('p-flux');
const React = require('react');
const propTypes = require('prop-types');
const Viz = require('./viz');

class HomePage extends React.Component {
  static propTypes = {
    root: propTypes.any,
    accessToken: propTypes.string
  };

  fetch = () => {
    Actions.fetchGrapi(this.props.accessToken);
  };
  componentDidMount() {
      this.fetch();
  }
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