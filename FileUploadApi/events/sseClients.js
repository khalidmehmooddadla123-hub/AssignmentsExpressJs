const clients = [];

function addClient(res) {
  clients.push(res);
}

function removeClient(res) {
  const index = clients.indexOf(res);
  if (index !== -1) clients.splice(index, 1);
}

function broadcastUploadEvent(payload) {
  const data = `data: ${JSON.stringify(payload)}\n\n`;
  clients.forEach((clientRes) => {
    clientRes.write(data);
  });
}

module.exports = {
  clients,
  addClient,
  removeClient,
  broadcastUploadEvent,
};