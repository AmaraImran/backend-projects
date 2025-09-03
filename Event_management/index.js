const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin");
const eventroutes = require("./routes/event");
const connection = require('./connection');
const path=require('path')
app.use(express.static("public"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/admin", adminRoutes);
app.use("/event", eventroutes);
connection.connectTodatabase("mongodb://localhost:27017/event-management")
.then(() => console.log("connected to db"));

app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))
app.get('/', (req, res) => {
   res.render("Login")
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
