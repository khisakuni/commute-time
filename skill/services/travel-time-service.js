const http = require('axios');
const GOOGLE_API_KEY = process.env.CT_GOOGLE_API_KEY;
const GOOGLE_API_ENDPOINT = process.env.CT_GOOGLE_API_ENDPOINT;

function CommuteTimeService() {}

CommuteTimeService.prototype.getCommuteTimeInMinutes = (start, end) => {
  const url = `${GOOGLE_API_ENDPOINT}?key=${GOOGLE_API_KEY}&origins=${start}&destinations=${end}`;
  return http.get(url).then(res => res.data.rows[0].elements[0].duration.text.split(' ')[0]);
}

module.exports = CommuteTimeService;
