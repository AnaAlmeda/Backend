const express = require('express');
const morgan = require ('morgan');
const ruta = require ('./routes');
const exphbs = require ('express-handlebars').engine;
const path = require ('path');
const app = express(); //instancia de express
const authentication = require ('./routes/authentication.js');
const link =  require ('./routes/links.js');



// settings- configuraciones
app.set('port', process.env.PORT || 4000);

app.set('views', path.join( __dirname , 'views'));
app.engine ('.hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutDir: path.join(app.get('views'),'Layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set ('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req,res,next) => {
 next();
});


//routes
app.use(ruta);
app.use (authentication);
app.use('/links',link);


//public
app.use(express.static(path.join(__dirname, 'public')));


//Inicio del servidor
app.listen(app.get('port'), () =>{
    console.log ('El servidor escucha en el puerto', app.get('port'));
});
