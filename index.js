// code away!
const server = require("./api/server");

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`\n server listening on http://localhost:${port} \n`);
});
