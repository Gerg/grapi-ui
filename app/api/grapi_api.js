const {fetchJson} = require('../../helpers/fetch_helper');

const FakePostsApi = {
  fetch({accessToken, apiUrl}) {
    const headers = {accept: 'application/json', 'Content-Type': 'application/graphql'};
    // const body = '{apps(limit: 100) {name, packages {guid, state}, processes {guid, instances, type}}}';
    const body = '{apps { name, guid, current_droplet {guid}, droplets {guid, state, package {guid, state} }, processes {guid, type, instances {actual_memory_mb}, routes {host, domain}}, packages {guid, state} }}';
    return fetchJson(`${apiUrl}/graphql`, {accessToken, headers, method: 'POST', body});
  }
};

module.exports = FakePostsApi;