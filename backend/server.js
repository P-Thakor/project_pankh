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

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

async function main() {
  await mongoose.connect(DB);
  console.log('Connection!');
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
