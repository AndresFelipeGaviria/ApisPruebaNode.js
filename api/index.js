
const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');
const { checkApikey } = require('./middlewars/auth.handler');

const {errorHandler, logErrors, boomErrorHandler, ormErrorHandler} = require('./middlewars/error.handler')

//creamos una aplicacion con express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
// http://localhost/http://localhost:3000/api/v1/products
const whitelist = ['http://localhost', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    console.log(origin)
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));
require('../utils/auth')

app.get('/api', (req, res) => {
  res.send('Hola mi serve en express');
});

app.get('/api/nueva-ruta', checkApikey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port )
})
