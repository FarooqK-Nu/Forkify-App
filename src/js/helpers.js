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
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const sendJSON = async function (url, data) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(`${responseData.message} (${res.status})`);
    }
    return responseData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
