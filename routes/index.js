var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employees',
  password: '123abc',
  port: 5432,
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
GET
*/
router.get('/members', function (req, res, next) {
  pool.query('SELECT * FROM members ', (error, respsonse) => {
    if (error) {
      console.log(error);
    } else {
      res.send(respsonse.rows)
    }
  })
});

/*
POST
*/
router.post('/members', function (req, res, next) {
  const name = req.body.name, phone = req.body.phone, birthday = req.body.birthday;
  console.log(name, phone, birthday);
  pool.query("insert into members (name,phone,birthday) values($1,$2,$3)", [name, phone, birthday], (error, respsonse) => {
    if (error) {
      res.send(error)
    } else {
      res.json(respsonse.rows[0]);
    }
  })
});

/*
  PUT
*/
router.put('/members/:id', function (req, res) {

  const id = parseInt(req.params.id)
  const { name, phone, birthday } = req.body
  pool.query(
    `UPDATE members SET name=$1,phone=$2,birthday=$3 WHERE id=$4`,
    [name, phone, birthday, id],
    (error, results) => {
      if (error) {
        console.log(error)
        throw error
      }
      console.log(results)
      res.status(200).send(`Member modified with ID: ${id}`)
    }
  )
})

/*
 DELETE
*/
router.delete('/members/:id', function (request, response) {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM members WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Member deleted with ID: ${id}`)
  })
})

/*----------------------------------------------------*/


/*----------------------------------------------------*/

/*
GET
*/
router.get('/projects', function (req, res, next) {
  pool.query('SELECT * FROM projects ', (error, respsonse) => {
    if (error) {
      console.log(error);
    } else {
      res.send(respsonse.rows)
    }
  })
});

/*
POST
*/
router.post('/projects', function (req, res, next) {
  const name = req.body.name, description = req.body.description, member_id = req.body.member_id;
  pool.query("insert into projects (name,description,member_id) values($1,$2,$3)", [name, description, member_id], (error, respsonse) => {
    if (error) {
      res.send(error)
    } else {
      res.send('Project:' + name + description + member_id);
    }
  })
});

/*
  PUT
*/
router.put('/projects/:id', function (req, res) {

  const id = parseInt(req.params.id)
  const { name, description, member_id } = req.body
  pool.query(
    `UPDATE projects SET name=$1,description=$2,member_id=$3 WHERE id=$4`,
    [name, description, member_id, id],
    (error, results) => {
      if (error) {
        console.log(error)
        throw error
      }
      console.log(results)
      res.status(200).send(`Project modified with ID: ${id}`)
    }
  )
})

/*
 DELETE
*/
router.delete('/projects/:id', function (request, response) {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM projects WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Project deleted with ID: ${id}`)
  })
})

module.exports = router;
