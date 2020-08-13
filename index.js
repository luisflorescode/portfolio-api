const express = require('express');
const app = express();
const cors = require('cors');
const { config } = require('./config');
const heroApi = require('./routes/hero');
const aboutApi = require('./routes/about');
const skillsApi = require('./routes/skills');
const projectsApi = require('./routes/projects');
const communitiesApi = require('./routes/communities');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// CORS
const corsOptions = { origin: 'https://luisfloresdev.com' };
app.use(cors(corsOptions));

// Body Parser
app.use(express.json());

// Routes
heroApi(app);
aboutApi(app);
skillsApi(app);
projectsApi(app);
communitiesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors Middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
