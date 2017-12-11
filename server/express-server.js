let express = require('express');
let app = express();

app.use('/', express.static('./public'));

let server = app.listen(process.env.PORT || 8000, function(){
  console.log('Server is running...');
});
