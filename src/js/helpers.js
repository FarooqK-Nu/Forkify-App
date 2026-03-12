import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
    if (!res.ok) {
      throw new Error(`Invalid Recipe ID: ${res.status}`);
    }
    // https://forkify-api.jonas.io/api/v2/recipes?search=pizza

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
