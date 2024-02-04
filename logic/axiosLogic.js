const axios = require('axios');

let axiosLogic = {
    sendRequest : async function (axiosParams) {
        let config = {
          method: axiosParams.method,
          url:  axiosParams.url,
          headers: axiosParams.headers
        };
        return await axios(config).then(function (response) {
          //console.log(response.data);
          if (response.status != 200) {
            return {err : response}
          }
          return {err : '', response};
          
        }).catch(function (error) {
          console.log(error);
          return {err : error}
        });
    }
}

module.exports = axiosLogic