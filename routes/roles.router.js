const express = require('express');
const db = require('../db/index');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT role
      FROM roles;
    `);
    res.send(rows).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post('/', async (req, res) => {
  const user = req.user;
  const data = req.body;
  try {
    const isAdmin = await db.query(`
      SELECT COUNT(*)
      FROM users_roles
      WHERE users_id = $1 AND roles_id IN (1, 2);
    `, [ user.id ]).rowCount === 1;
    if (!isAdmin) {
      res.status(403);
    } else {
      const { rows } = await db.query(
        `
            INSERT INTO roles(role)
              VALUES($1)
            RETURN *;
          `,
        [data.role]
      );
      res.send(rows).status(200);
    }
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete(`/:id`, async (req, res) => {
  const roleId = req.params.id;
  const user = req.user;
  try {
    const isAdmin = await db.query(`
      SELECT COUNT(*)
      FROM users_roles
      WHERE users_id = $1 AND roles_id IN (1, 2);
    `, [ user.id ]).rowCount === 1;
    if (!isAdmin) {
      res.status(403);
    } else {
      const { rows } = await db.query(
        `
          DELETE *
          FROM roles
          WHERE id = $1;
          `,
        [roleId]
      );
      res.send(rows).status(200);
    }
  } catch (error) {
    res.send(error).status(500);
  }
});
})
