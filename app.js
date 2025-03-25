const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/budget');
const { engine } = require('express-handlebars');
const app = express();

app.engine('hbs', engine({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: "views/layouts"
}))
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res) => {
    res.status(404).render('404', { message: 'Page Not Found' });
});

const PORT = process.env.PORT || 3111;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

