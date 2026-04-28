async function sendData(payload) {

  const response = await fetch(CONFIG.API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },

    body: JSON.stringify(payload)

  });

  return await response.json();

}
