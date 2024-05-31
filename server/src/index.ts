import app from './server';
import { config } from 'dotenv';

config();

app.listen(3000, () => {
  console.log(`App is listening on port 3000`);
});
