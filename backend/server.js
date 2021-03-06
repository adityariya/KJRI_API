const express = require ('express')
const dotenv = require ('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const path = require('path')
const connectDB = require('./config/db')



// load env variables
dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 5000;
connectDB();



// Route Files
// const usersRoute = require('./routes/users');
const archivesRoute = require('./routes/archives');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const regularRoute = require('./routes/regulars');
const reportRoute = require('./routes/reports');
const coverRoute = require('./routes/covers');
const statementRoute = require('./routes/statements');
const employeesRoute = require('./routes/employees');
const projectRoute = require('./routes/projects');

const app = express();
app.use(cors());
// MIDDLEWARE
app.use(bodyParser.json());

// DEV LOGGING 
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
// =====================



// HTTP REQUEST, MOUNT ROUTER
// TODO: need to be routed 
// USERS
// app.use('/users', usersRoute);
// app.get('/users/:id', (req, res) => {
//   res.send("some user with id");
// });
// ================ USERS

app.use('/api/archives', archivesRoute);
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/regulars',regularRoute);
app.use('/api/reports', reportRoute);
app.use('/api/covers', coverRoute);
app.use('/api/statements', statementRoute);
app.use('/api/employees', employeesRoute);
app.use('/api/projects', projectRoute);

app.use(errorHandler);
app.use(cookieParser);


app.listen(PORT, (console.log(`Server running on port: http://localhost:${PORT} in ${process.env.NODE_ENV}`.yellow.bold)));


// handle unhandle rejection, promise rejection instead of try catch(eg. for db.js)
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});