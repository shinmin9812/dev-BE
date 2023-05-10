const jwt = require('jsonwebtoken');
const { userService } = require('../services/user-service');

class AuthService {
	async login(userEmail, password) {
		// 이메일로 사용자 조회
		const user = await userService.getUserByEmail(userEmail);
		if (!user) {
			throw new Error('존재하지 않는 사용자입니다.');
		}

		// 비밀번호 검증
		const isValidPassword = await userService.verifyPassword(
			password,
			user.password,
		);
		if (!isValidPassword) {
			throw new Error('비밀번호가 일치하지 않습니다.');
		}

		//JWT 토큰 발급
		const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, {
			expiresIn: '1d',
		});
		return token;
	}
}
const authService = new AuthService();

module.exports = { authService };
