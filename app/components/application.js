const React = require('react');
const propTypes = require('prop-types');
const {useStore} = require('p-flux');
const {useRouter} = require('./use_router');
const Router = require('./router');
const {useAuthorization} = require('./authorization');

if (typeof document !== 'undefined') {
  require('../stylesheets/application.scss');
}

class Application extends React.Component {
  static propTypes = {
    accessToken: propTypes.string,
    config: propTypes.object.isRequired,
    store: propTypes.object.isRequired,
    router: propTypes.oneOfType([propTypes.object, propTypes.func])
  };

  constructor(props, context) {
    super(props, context);
    if(typeof MyReactStarter !== 'undefined') MyReactStarter.location = window.location;
  }

  render() {
    const {config, store, router, accessToken} = this.props;
    if(!accessToken) return null;
    return (
      <div className="grapi">
        <Router {...{router, config, accessToken, ...store}}/>
      </div>
    );
  }
}

const EnhancedApplication = useStore(useAuthorization(useRouter(Application)),
  {
    store: require('../store'),
    actions: [],
    dispatcherHandlers: [
      require('../dispatchers/main_dispatcher'),
      require('../dispatchers/api_dispatcher')
    ],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

module.exports = EnhancedApplication;
