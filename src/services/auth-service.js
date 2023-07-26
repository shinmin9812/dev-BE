const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userDAO } = require('../db/dao/user-dao');

class AuthService {
	async login(userEmail, password) {
		try {
			// 이메일로 사용자 조회
			const user = await userDAO.findUserByEmail(userEmail);

			if (!user) {
				const error = new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
				error.status = 401;
				throw error;
			}

			// 비밀번호 검증
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				const error = new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
				error.status = 401;
				throw error;
			}

			// JWT 토큰 발급
			const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, {
				expiresIn: '1d',
			});

			return token;
		} catch (err) {
			throw err;
		}
	}
}
const authService = new AuthService();

module.exports = { authService };
