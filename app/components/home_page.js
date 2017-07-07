const {Actions} = require('p-flux');
const React = require('react');
const types = React.PropTypes;

class HomePage extends React.Component {
  static propTypes = {
    root: types.any
  };

  constructor(props, context) {
    super(props, context);
    this.state = {accessToken: ''};
  }

  onChange = (e) => {
    this.setState({accessToken: e.currentTarget.value});
  };

  fetch = () => {
    Actions.fetchGrapi(this.state.accessToken);
  };

  render() {
    const {accessToken} = this.state;
    const {root} = this.props
    return (
      <div className="api-page">
        <label>Access Token please<input value={accessToken} onChange={this.onChange}/></label>
        <button onClick={this.fetch}>Click Me</button>
        <div>{JSON.stringify(root)}</div>
      </div>
    );
  }
}

module.exports = HomePage;