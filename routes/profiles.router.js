const express = require('express');
const db = require('../db/index');
const router = express.Router();
const userStrategy = require('../strategies/user.strategy');

/**
 * GET api/profile/:id
 * @return profile of user with user_id matching id.
 */
router.get('/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const { rows } = await db.query(
      `
        SELECT *
        FROM profile
        WHERE users_id = $1;
      `,
      [userId]
    );
    res.send(rows).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.post(`/:user_id`, async (req, res) => {
  const userId = req.params.user_id;
  const user = req.user;
  const data = req.body;
  if (userId !== user.id) { res.status(403); }

  try {
  const { rows } = await db.query(
    `
    INSER INTO profile(users_id, firstName, lastName, birthday)
      VALUES($1, $2, $3, $4)
      RETURN id;
  `,
    [userId, data.firstName, data.lastName, data.birthday]
  );
  res.send(rows).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete(`/:user_id`, async (req, res) => {
  const userId = req.params.user_id;
  const user = req.user;

  if (userId !== user.id) { res.send(403); }

  try {
    const { rowCount } = await db.query(`
      DELETE *
      FROM profile
      WHERE users_id = $1
    `, [userId]);
    res.send(rowCount).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

router.get(`/admin`, async (req, res) => {
  const user = req.user;
  try {
    const isAdmin = await db.query(`
    SELECT COUNT(*)
    FROM users_roles
    WHERE users_id = $1 AND roles_id =  1;
  `, [ user.id ]).rowCount === 1;

    if (isAdmin) {
      const { rows } = await db.query(`
        SELECT *
        FROM profile;
      `);
      res.send(rows).status(200);
    } else {
      res.status(403);
    }
  } catch (error) {
    res.send(error).status(500);
  }
});


module.exports = router;
