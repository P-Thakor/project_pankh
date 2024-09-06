const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

process.on('uncaughtException', (err) => {
  console.log(`${err.name} --> ${err.message}\nUNCAUGHT EXCEPTION💣\n${err}`);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

app.use(
  cors({
    origin: '*',
    // origin: disable,
  }),
);

app.use((req, res, next) => {
  res.writeHead('Access-Control-Allow-Origin', '*'); // Allow specific origin
  res.writeHead('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE'); // Allowed methods
  res.writeHead(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Custom-Header',
  ); // Allowed custom headers
  res.writeHead('Access-Control-Expose-Headers', 'X-Custom-Header'); // Expose custom headers to client
  next();
});

// ap;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

async function main() {
  await mongoose.connect(DB);
  await console.log('Connection!');
}

// console.log(process.env);
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App Running on ${port}...`);
});

main().catch((err) => {
  console.log(`${err.name} --> ${err.message}\nUNHANDLED REJECTION💣`);
  server.close(() => {
    process.exit(1);
  });
});
