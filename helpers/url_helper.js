const Url = require('url');

const UrlHelper = {
  clearLocationHash(loc = '/') {
    MyReactStarter.history ? MyReactStarter.history.replaceState({}, document.title, loc) : MyReactStarter.location.hash = '';
  },

  getCredentials(url) {
    /*eslint-disable no-unused-vars*/
    const [_, prefix, user, password, suffix] = url.match(/(^.+?\/\/)(.+?):(.+?)@(.+$)/) || [];
    /*eslint-enable no-unused-vars*/
    if(prefix && suffix) {
      url = prefix + suffix;
    }
    return {user, password, url};
  },

  getRedirectUriFromLocation() {
    return Url.format(Object.assign(Url.parse(MyReactStarter.location.href), {hash: null}));
  },

  getRootUri() {
    const {host, protocol} = Url.parse(MyReactStarter.location.href);
    return Url.format({host, protocol});
  }
};

module.exports = UrlHelper;