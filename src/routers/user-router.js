const { Router } = require('express');
const { userService } = require('../services/user-service');
const userRouter = Router();

userRouter.get('/', async (req, res) => {
	const users = await userService.getAllUsers();
	res.json(users);
});

userRouter.get('/:userEmail', async (req, res) => {
	const { userEmail } = req.params;
	const user = await userService.getUserByEmail(userEmail);
	res.json(user);
});

userRouter.post('/', async (req, res) => {
	const userInfo = req.body;
	const user = await userService.createUser(userInfo);
	res.json(user);
});

userRouter.delete('/:userEmail', async (req, res) => {
	const { userEmail } = req.params;
	await userService.deleteUser(userEmail);
	res.json(`${userEmail}삭제 성공`);
});

userRouter.put('/:userEmail', async (req, res) => {
	const { userEmail } = req.params;
	const userInfo = req.body;
	await userService.updateUser(userEmail, userInfo);
	res.json(`${userEmail}수정 성공`);
});

module.exports = { userRouter };
