import * as express from 'express'
import { Request,Response } from 'express' 
import * as cors from 'cors'

    const app= express()
    const port = 8001
    
    app.use(cors({
        origin: ['http://localhost:3000','http://localhost:8080','http://localhost:4200']
    }))
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
  
    const db = require("./src/entity");
    db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

    console.log('listening to port :8001')
    
    app.listen(port)


