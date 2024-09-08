const dotenv = require('dotenv');
const mongoose = require('mongoose');
<<<<<<< HEAD
const app = require('./app');
const cors = require('cors');
app.use(cors());
=======
const cors = require('cors');
>>>>>>> 5a1ef9b6bc97c62b38a71c1f7f01c116becb8b01

process.on('uncaughtException', (err) => {
  console.log(`${err.name} --> ${err.message}\nUNCAUGHT EXCEPTION💣\n${err}`);
});

dotenv.config({ path: './config.env' });

<<<<<<< HEAD
=======
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

>>>>>>> 5a1ef9b6bc97c62b38a71c1f7f01c116becb8b01
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

async function main() {
  await mongoose.connect(DB);
  await console.log('Connection!');
}

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});

main().catch((err) => {
  console.log(`${err.name} --> ${err.message}\nUNHANDLED REJECTION💣`);
  server.close(() => {
    process.exit(1);
  });
});
