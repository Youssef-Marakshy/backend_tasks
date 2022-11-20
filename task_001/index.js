const express = require("express");
const {Infinity} = require("mathjs");
const {read, write} = require("./Storage");
const app = express();

app.use(express.json());

//root route
app.get("/users", async function (req, res) {
    let users = await read("data.json")


    res.json(JSON.parse(users));
});

app.post("/users", async function (req, res) {
    let user = req.body;
    let text = await read("data.json");
    console.log(text)
    let users = JSON.parse(text)

    let ids = users.map(u => u.id);
    if (ids.length > 0)
        user.id = Math.max(...ids) + 1;
    else
        user.id = 1001;


    users.push(user)
    console.log(users)
   await write("data.json", JSON.stringify(users))
    res.json({musersessage: "user created successfully"});
});
app.get("/users/:id", function (req, res) {
    read("data.json").then(text => {
        let users = JSON.parse(text)
        let {id} = req.params;
        res.json(users.find((item) => item.id == id));
    })
});

app.delete("/users/:id", function (req, res) {
  //logic delete
  if (req.params && typeof req.params['id'] !== 'undefined') {
    read("data.json").then(async text => {
        let users = JSON.parse(text);
        const {id} = req.params;
        const userResult = users.find((item => item.id == id));
        if (userResult) {
            users.splice(users.indexOf(userResult), 1);
            await write("data.json", JSON.stringify(users));
            res.json({musersessage: 'User has been successfuly deleted.'});
        } else {
            res.json({musersessage: 'User was not found.'});
        }
      });
  } else {
    res.json({musersessage: 'User was not found.'});
  }
});

app.listen(3000)

