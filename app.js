const socketIO = require("socket.io");
const http = require("http");
const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");
const app = require('./routes');

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const pool = new Pool({ connectionString: process.env.DB_URL });

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

io.adapter(createAdapter(pool));
io.on("connection", require('./utils/socket'));

const PORT = process.env.PORT || 3002;
server.listen(PORT, async () => {
  console.log("Backend started on port: " + PORT);
})
