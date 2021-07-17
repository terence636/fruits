## This is an example of express-mongodb CRUD app

# Setup of express

```
1. mkdir, cd into the dir
2. touch server.js .env .gitignore
3. mkdir views models
4. touch views/index.ejs views/show.ejs models/dummy.js
5. npm init -y
6. npm i express dotenv nodemon ejs body-parser method-override
7. code .
8. in .gitignore (included if you use https://www.toptal.com/developers/gitignore window, osx, node, visualstudiocode, dotenv )
.env
node_modules/
9. in .env
PORT=3000


10. in server.js
const express = require("express"); 
const dummy = require("./models/dummy.js")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
}); 

10. npx nodemon server.js
```

# Setup of mongoDB
