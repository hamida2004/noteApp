const express = require('express');
const env = require('dotenv');
env.config();
const cors = require('cors');
const port = process.env.PORT;
const app = express();
const db = require('./models');
const AuthRouter = require('./routes/Auth')
const NotesRouter = require('./routes/Note')

app.use(express.json());
app.use(cors());
app.use('/notes' , NotesRouter)
app.use('/auth', AuthRouter)
// Sync all models individually
// the err was that i hadn't installed 
//sequalize-cli and hadn't run it 
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port} ...`);
  });
}).catch(error => {
  console.error('Error syncing models:', error);
});
