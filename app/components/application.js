const React = require('react');
const types = React.PropTypes;
const {useStore} = require('p-flux');
const {useRouter} = require('./use_router');
const Router = require('./router');

if (typeof document !== 'undefined') {
  require('../stylesheets/application.scss');
}

class Application extends React.Component {
  static propTypes = {
    config: types.object.isRequired,
    store: types.object.isRequired,
    router: types.oneOfType([types.object, types.func])
  };

  render() {
    const {config, store, router} = this.props;
    return (
      <div className="grapi">
        <Router {...{router, config, ...store}}/>
      </div>
    );
  }
}

const EnhancedApplication = useStore(useRouter(Application),
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
