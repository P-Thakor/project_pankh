const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const cors = require('cors');
app.use(cors());

process.on('uncaughtException', (err) => {
  console.log(`${err.name} --> ${err.message}\nUNCAUGHT EXCEPTION💣\n${err}`);
});

dotenv.config({ path: './config.env' });

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
