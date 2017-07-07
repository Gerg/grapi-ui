const {Actions} = require('p-flux');
const {clearLocationHash} = require('../../helpers/url_helper');
const qs = require('qs');
const React = require('react');

const propTypes = require('prop-types')


module.exports = {
  useAuthorization(Component) {
    class Authorization extends React.PureComponent {
      static propTypes = {
        config: propTypes.object.isRequired,
        db: propTypes.object
      };

      constructor(props, context) {
        super(props, context);
        this.state = {accessToken: null};
      }

      componentDidMount() {
        const clientId = 'hackday';
        const uaaUrl = 'uaa.superman-lite.cf-app.com';

        let {access_token: accessToken} = MyReactStarter.location.hash && qs.parse(MyReactStarter.location.hash.slice(1));

        console.log({accessToken});

        if (!accessToken) {
          Actions.authorizationRedirect({clientId, uaaUrl});
          return;
        }

        if (this.state.accessToken === accessToken) return;
        this.setState({accessToken});
        clearLocationHash(MyReactStarter.location.pathname);
      }

      render() {
        return (<Component {...this.props} {...this.state}/>);
      }
    }

    return Authorization;

  }
};