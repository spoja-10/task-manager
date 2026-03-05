const router = require('express').Router();
const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/auth');

router.use(protect);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
