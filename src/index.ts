import Express from 'express';
import routes from './routes/index';
import session from 'express-session';

const app = Express();

app.set('view engine', 'ejs');
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(Express.static('statics'));

app.use(session({
    secret: 'qidjxiajdawdjawidwaakxnakxk',
    resave: false,
    saveUninitialized: true
}));

app.use(routes);

app.listen(3500, () => console.log('rodando!'));