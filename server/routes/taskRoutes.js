const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getTasks, getTask, createTask,
  updateTask, deleteTask, toggleTask, reorderTasks
} = require('../controllers/taskController');

const taskValidation = [
  body('title').notEmpty().withMessage('Title is required').trim().isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format')
];

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.patch('/reorder', reorderTasks);

router.route('/:id')
  .get(getTask)
  .put(taskValidation, updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle', toggleTask);

module.exports = router;
