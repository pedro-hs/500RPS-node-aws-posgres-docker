import http from 'k6/http';
import { check } from 'k6';

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  scenarios: {
    charts: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  const countryRes = http.get(`${BASE}/api/v1/traffic/countries/volume`);
  const vehicleRes = http.get(`${BASE}/api/v1/traffic/vehicles-type/count`);

  check(countryRes, { 'countries 200': (r) => r.status === 200 });
  check(vehicleRes, { 'vehicles 200': (r) => r.status === 200 });
}
