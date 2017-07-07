const React = require('react');
const types = require('react').PropTypes;
const HomePage = require('./home_page');

function isObject(obj) {
  return typeof obj === 'object';
}

function toFlattenedRoutes(routesHash) {
  return Object.keys(routesHash).reduce((paths, parent) => {
    if (isObject(routesHash[parent])) {
      const children = toFlattenedRoutes(routesHash[parent]);
      Object.keys(children).forEach(child => paths[parent + child] = children[child]);
    } else {
      paths[parent] = routesHash[parent];
    }
    return paths;
  }, {});
}

const ROUTES = {
  '/': 'homePage',
};

const PAGES = { HomePage };

class Router extends React.Component {
  static propTypes = {
    router: types.oneOfType([types.object, types.func])
  };

  constructor(props, context) {
    super(props, context);
    const {state} = this;
    this.state = {...state, pageName: 'HomePage' };
  }

  componentDidMount() {
    const {router} = this.props;
    Object.entries(toFlattenedRoutes(ROUTES)).map(([path, callbackName]) => {
      router.get(path, this[callbackName]);
    });
  }

  homePage = () => {
    this.setState({pageName: 'HomePage'});
  };

  render() {
    const {pageName} = this.state;
    const Page = PAGES[pageName];
    return (
      <Page {...this.props}/>
    );
  }
}

module.exports = Router;
