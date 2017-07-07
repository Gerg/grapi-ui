const {fetchJson} = require('../../helpers/fetch_helper');

const apiUrl = 'http://grapi.superman-lite.cf-app.com';

const FakePostsApi = {
  fetch(accessToken) {
    console.log({accessToken})
    const headers = {accept: 'application/json', 'Content-Type': 'application/graphql'};
    // const body = '{apps(limit: 100) {name, packages {guid, state}, processes {guid, instances, type}}}';
    const body = '{apps {name, packages {guid, state}}}';
    return fetchJson(`${apiUrl}/graphql`, {accessToken, headers, method: 'POST', body});
  }
};

module.exports = FakePostsApi;