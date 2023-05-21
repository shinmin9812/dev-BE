const { Router } = require('express');
const { userService } = require('../services/user-service');
const { bookService } = require('../services/book-service');
const { addSampleWords } = require('../utils/addSampleWords');
const verifyToken = require('../middlewares/auth-handler');
const sampleData = require('../../data.json');
const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
});

userRouter.get('/me', verifyToken, async (req, res, next) => {
	try {
		const { userEmail } = req.user;
		const user = await userService.getUserByEmail(userEmail);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

userRouter.get('/me/email', verifyToken, async (req, res, next) => {
	try {
		const { userEmail } = req.user;
		res.status(200).json(userEmail);
	} catch (err) {
		next(err);
	}
});

userRouter.post('/', async (req, res, next) => {
	try {
		const userInfo = req.body;
		const user = await userService.createUser(userInfo);
		const sampleBook = await bookService.createSample(user.userEmail);
		const sampleWords = await addSampleWords({ body: sampleData }, sampleBook.ownerEmail, sampleBook.short_id, null)
		res.status(200).json(user);
	} catch (err) {
		next(err); ''
	}
});

userRouter.post('/me', verifyToken, async (req, res, next) => {
	try {
		const { userEmail } = req.user;
		const { typedPassword } = req.body;
		await userService.deleteUser(userEmail, typedPassword);
		res.status(204).json('success');
	} catch (err) {
		next(err);
	}
});

userRouter.put('/me', verifyToken, async (req, res, next) => {
	try {
		const { userEmail } = req.user;
		const userInfo = req.body;
		await userService.updateUser(userEmail, userInfo);
		res.status(200).json('success');
	} catch (err) {
		next(err);
	}
});

module.exports = { userRouter };
