
const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');

const {errorHandler, logErrors, boomErrorHandler} = require('./middlewars/error.handler')

//creamos una aplicacion con express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
http://localhost/http://localhost:3000/api/v1/products
// const whitelist = ['http://localhost', 'https://myapp.co'];
// const options = {
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin)){
//       callback(null, true);
//     }else {
//       callback(new Error('No permitido'))
//     }
//   }
// }
// app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Hola mi serve en exoress');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port )
})
