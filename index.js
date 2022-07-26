const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employee",
});

app.get("/deemt", (req, res) => {
  db.query("SELECT * FROM deemt", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/inemt", (req, res) => {
  db.query("SELECT * FROM inemt", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.post("/create", (req, res) => {
  const idStudent = req.body.idStudent;
  const fullname = req.body.fullname;
  const lastname = req.body.lastname;
  const idRoom = req.body.idRoom;
  

  db.query(
    "INSERT INTO student (idStudent, fullname, lastname, idRoom) VALUES (?,?,?,?)",
    [idStudent, fullname, lastname, idRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createEmt", (req, res) => {
  const idEmt = req.body.idEmt;
  const nameEmt = req.body.nameEmt;
  const count = req.body.count;
   
  db.query(
    "INSERT INTO emt (idEmt, nameEmt, count) VALUES (?,?,?)",
    [idEmt, nameEmt, count],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createDeEmt", (req, res) => {
  const idBorrow = req.body.idBorrow;
  const date = req.body.date;
  const idStudent1 = req.body.idStudent1;
  const list = req.body.list; 
  db.query(
    "INSERT INTO deemt (idBorrow, date, idStudent,list) VALUES (?,?,?,?)",
    [idBorrow, date, idStudent1,list],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createInEmt", (req, res) => {
  const idReturn1 = req.body.idReturn1;
  const idBorrow1 = req.body.idBorrow1;
  const date1 = req.body.date1;
   
  db.query(
    "INSERT INTO inemt (idReturn, idBorrow, date) VALUES (?,?,?)",
    [idReturn1, idBorrow1, date1],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});



app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});
