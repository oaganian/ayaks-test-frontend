const mysql = require('mysql');
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "realtorsdb"

});


app.listen(PORT, () => {
  console.log(`Server is working on the ${PORT}`);
});
/*найти всех риэлторов либо отфильтровать */
app.get('/api/realtors', (req, res) => {

  if (Object.keys(req.query).length == 2) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query('SELECT r.id, r.lastname, r.name, r.reg_date,r.subdivisions_id, s.name as subdivision FROM realtors r INNER JOIN subdivisions s ON r.subdivisions_id = s.id', function (err, rows) {
        if (err) {

          connection.end(); // if error occured closed the connection
          console.error(err);
          return;
        }
        let realtors = [];

        rows.forEach(element => {
          realtors.push({
            id: element.id,
            lastname: element.lastname,
            name: element.name,
            reg_date: element.reg_date,
            subdivision: element.subdivision,
            subdivisions_id: element.subdivisions_id
          });

        });
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < realtors.length) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        results.total = rows.length + 1;
        results.error = err;
        results.results = realtors.slice(startIndex, endIndex);
        res.status(200).send(results);

        connection.end();// After performing the operation then closed the connection.
      });
    });
  }
  if (Object.keys(req.query).length > 2) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) throw err;
      let queryPart = "select *, s.name as subdivision from realtors r left join subdivisions s on r.subdivisions_id=s.id where "; // 
      for (var key in req.query) {
        if (req.query[key] != "" && key != "page" && key != "limit") {
          queryPart += ` r.${key} LIKE '%${req.query[key]}%' AND `;
        }
      };
      queryPart = queryPart.substring(0, queryPart.length - 4);
      let realtors = [];
      connection.query(queryPart, function (err, rows) {
        if (err) {
          connection.end();
          console.error(err);
          return;
        }
        rows.forEach(element => {
          realtors.push({
            id: element.id,
            lastname: element.lastname,
            name: element.name,
            reg_date: element.reg_date,
            subdivisions_id: element.subdivisions_id,
            subdivision: element.subdivision
          });
        });
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < realtors.length) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        results.total = rows.length + 1;
        results.error = err;
        results.results = realtors.slice(startIndex, endIndex);
        res.status(200).send(results);
        connection.end();// After performing the operation then closed the connection.
      });
    });
  }


});
/*удаление риэлтора по id */
app.delete('/api/realtors/:id', (req, res) => {
  mysqlPool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(`DELETE FROM realtors WHERE id = ${req.params.id}`, function (err, rows) {
      if (err) {

        connection.end(); // if error occured closed the connection
        console.error(err);
        return;
      }
      res.status(200).send({
        message: "Риэлтор успешно удален"
      });
      connection.end();// After performing the operation then closed the connection.
    });
  });


});
/*создание риэлтора */
app.post('/api/realtors', (req, res) => {
  mysqlPool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("INSERT INTO `realtors` (`lastname`, `name`,`reg_date`,`subdivisions_id`) VALUES ('" + req.body.lastname + "','" + req.body.name + "','" + req.body.reg_date + "','" + req.body.subdivisions_id + "')", function (err, rows) {
      if (err) {

        connection.end(); // if error occured closed the connection
        console.error(err);
        return;
      }
      res.status(200).send({
        message: "Риэлтор успешно добавлен"
      });
      connection.end();// After performing the operation then closed the connection.
    });
  });

});
/*изменить риэлтора*/
app.patch('/api/realtors/:id', (req, res) => {
  mysqlPool.getConnection(function (err, connection) {
    if (err) throw err;

    let queryPart = "UPDATE realtors SET";

    for (var key in req.query) {
      if (req.query[key] != "") {
        queryPart += ` ${key}='${req.query[key]}', `;
      }
    };
    queryPart = queryPart.substring(0, queryPart.length - 2);
    queryPart += " WHERE id='" + req.params.id + "'";



    connection.query(queryPart, function (err, rows) {
      if (err) {

        connection.end(); // if error occured closed the connection
        console.error(err);
        return;
      }
      res.status(200).send({
        message: "Риэлтор успешно обновлен"
      });
      connection.end();// After performing the operation then closed the connection.
    });
  });
});
/*получить все подразделения */

app.get('/api/subdivisions', (req, res) => {
  mysqlPool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("SELECT id, name from subdivisions", function (err, rows) {
      if (err) {
        connection.end();
        console.error(err);
        return;
      }
      res.status(200).send(rows);
      connection.end();
    });
  });
});