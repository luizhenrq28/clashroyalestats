import Express from 'express';
import routes from './routes/index';
import 'dotenv/config';

const app = Express();

app.set('view engine', 'ejs');
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(Express.static('statics'));

app.use(routes);

app.listen(process.env.port, () => console.log('rodando!'));