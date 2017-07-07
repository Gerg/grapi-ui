const GrapiApi = require('../api/grapi_api');

const ApiDispatcher = {
  fetchGrapi({data}){
    return GrapiApi.fetch(data).then((data) => {
      this.dispatch({type: 'updateRoot', data});
    });
  },
  updateRoot({data}){
    this.$store.merge({root: data});
  }
};

module.exports = ApiDispatcher;
