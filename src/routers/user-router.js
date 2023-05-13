const { Router } = require('express');
const { userService } = require('../services/user-service');
const verifyToken = require('../middlewares/auth-handler');
const userRouter = Router();

userRouter.get('/', async (req, res) => {
	const users = await userService.getAllUsers();
	res.json(users);
});

userRouter.get('/me', verifyToken, async (req, res) => {
	const { userEmail } = req.user;
	const user = await userService.getUserByEmail(userEmail);
	res.json(user);
});

userRouter.get('/me/email', verifyToken, async (req, res) => {
	const { userEmail } = req.user;
	res.json(userEmail);
});

userRouter.post('/', async (req, res) => {
	const userInfo = req.body;
	const user = await userService.createUser(userInfo);
	res.json(user);
});

userRouter.delete('/me', verifyToken, async (req, res) => {
	const { userEmail } = req.user;
	const { typedPassword } = req.body;
	await userService.deleteUser(userEmail, typedPassword);
	res.json('success');
});

userRouter.put('/me', verifyToken, async (req, res) => {
	const { userEmail } = req.user;
	const userInfo = req.body;
	await userService.updateUser(userEmail, userInfo);
	res.json('success');
});

module.exports = { userRouter };
