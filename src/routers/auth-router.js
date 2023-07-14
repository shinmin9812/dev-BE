const { Router } = require('express');
const { authService } = require('../services/auth-service');
const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
	try {
		const { userEmail, password } = req.body;
		const token = await authService.login(userEmail, password);
		res.json({ token });
	} catch (err) {
		next(err);
	}
});

module.exports = { authRouter };
