const express = require('express');
const db = require('../db/knex');

const router = express.Router();

const REQUIRED_FIELDS = ['first_name', 'last_name', 'email'];

function validateEmployee(body) {
  const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.trim());
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  return null;
}

function pickEmployeeFields(body) {
  return {
    first_name: body.first_name?.trim(),
    last_name: body.last_name?.trim(),
    email: body.email?.trim(),
    department: body.department?.trim() || null,
    position: body.position?.trim() || null,
    salary: body.salary ? parseFloat(body.salary) : null,
  };
}

router.get('/', async (_req, res, next) => {
  try {
    const employees = await db('employees').orderBy('id', 'desc');
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const employee = await db('employees').where({ id: req.params.id }).first();
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const validationError = validateEmployee(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const data = pickEmployeeFields(req.body);
    const [id] = await db('employees').insert(data);
    const employee = await db('employees').where({ id }).first();
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const validationError = validateEmployee(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const existing = await db('employees').where({ id: req.params.id }).first();
    if (!existing) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const data = {
      ...pickEmployeeFields(req.body),
      updated_at: db.fn.now(),
    };

    await db('employees').where({ id: req.params.id }).update(data);
    const employee = await db('employees').where({ id: req.params.id }).first();
    res.json(employee);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await db('employees').where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
