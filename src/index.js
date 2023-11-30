const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const setupandstartserver = () => {
    app.use(bodyParser.json());
    //bodyparser is use to read request body properly
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server Started on port ${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({
                alter: true
            });
        }
    })
}
setupandstartserver();