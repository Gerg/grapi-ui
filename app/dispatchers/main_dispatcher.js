const UrlHelper = require('../../helpers/url_helper');
const join = require('url-join');
const qs = require('qs')

const MainDispatcher = {
  setRoute({data}) {
    this.router.navigate(data);
  },

  authorizationAuthorize(event) {
    this.dispatch({...event, type: 'authorizationRedirect'});
  },

  authorizationLogout({data: {clientId, uaaUrl = ''}}) {
    const query = qs.stringify({redirect: UrlHelper.getRootUri(), client_id: clientId});
    MyReactStarter.location.replace(join(uaaUrl, `logout.do?${query}`));
  },

  authorizationRedirect({data: {clientId, uaaUrl}}) {
    const responseType = 'token';
    const redirectUri = UrlHelper.getRedirectUriFromLocation();
    const query = qs.stringify({response_type: responseType, client_id: clientId, redirect_uri: redirectUri});

    const url = join(uaaUrl, 'oauth/authorize');
    // console.log(`https://${url}?${query}`)
    MyReactStarter.location.replace(`https://${url}?${query}`);
  },
};

module.exports = MainDispatcher;
