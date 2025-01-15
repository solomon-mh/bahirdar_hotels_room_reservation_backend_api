import express from 'express';
import { UsersService } from './providers/users.service';
import { UsersController } from './user.controller';

const router = express.Router();

const usersService = new UsersService();
const usersController = new UsersController(usersService);

router.get('/', (req, res) => usersController.getAllUsers(req, res));
router.get('/:id', (req, res) => usersController.getUser(req, res));
router.post('/', (req, res) => usersController.createUser(req, res));
router.patch('/:id', (req, res) => usersController.updateUser(req, res));
router.delete('/:id', (req, res) => usersController.deleteUser(req, res));

export const userRoutes = router;
