
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const requestLogger = require('./middlewares/requestLogger');
const validateContentType = require('./middlewares/validateContentType');
const apiKeyAuth = require('./middlewares/apiKeyAuth');
const errorHandler = require('./middlewares/errorHandler');

const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));


app.use(express.json());

app.use(requestLogger);
app.use(validateContentType);


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});


app.use('/api/public', publicRoutes);


app.use('/api/protected', apiKeyAuth, protectedRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found'
    }
  });
});


app.use(errorHandler);

module.exports = app;