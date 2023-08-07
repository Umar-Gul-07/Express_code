import express from 'express';
import mongoose from 'mongoose';
import { join } from 'path'; // Corrected import for 'join' function
import web from './routes/web.js';
 

const app = express();
const dbl = 'mongodb+srv://gulk31362:umar12345@cluster0.7mwfqxg.mongodb.net/authentication?retryWrites=true&w=majority';
const port = process.env.PORT ||  '3100';

mongoose
  .connect(dbl)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

  app.use(express.urlencoded({extended: true}))
// // static file
// app.use(express.static(join(process.cwd(), 'public')));
// app.use('/student/edit',express.static(join(process.cwd(), 'public')));


app.set("view engine", "ejs");
app.use('/', web);

app.get('/', (req, res) => {
  res.send('Hello world from the server');
});
