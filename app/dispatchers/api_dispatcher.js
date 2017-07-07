const GrapiApi = require('../api/grapi_api');

const ApiDispatcher = {
  fetchGrapi({data: accessToken}){
    return GrapiApi.fetch(accessToken).then((data) => {
      console.log("got some data", data);
      this.dispatch({type: 'updateRoot', data});
    });
  },
  updateRoot({data}){
    this.$store.merge({root: data});
  }
};

module.exports = ApiDispatcher;
