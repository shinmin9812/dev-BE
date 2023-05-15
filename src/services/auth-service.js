const jwt = require('jsonwebtoken');
const { userService } = require('../services/user-service');
const { userDAO } = require('../db/dao/user-dao');

class AuthService {
	async login(userEmail, password, res) {
		// 이메일로 사용자 조회
		const user = await userDAO.findUserByEmail(userEmail);

		if (!user) {
			const error = new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
			error.status = 401;
			throw error;
		}

		// 비밀번호 검증
		const isValidPassword = await userService.verifyPassword(
			password,
			user.password,
		);
		if (!isValidPassword) {
			const error = new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
			error.status = 401;
			throw error;
		}

		//JWT 토큰 발급
		const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, {
			expiresIn: '1d',
		});

		res.cookie('token', token, {
			maxAge: 86400000, // 토큰 만료 시간 (1일)
			httpOnly: true, // 클라이언트 스크립트에서 쿠키 접근 불가
			// secure: true, // HTTPS에서만 전송
			sameSite: 'strict', // 동일 사이트에서만 전송
		});

		return token;
	}
}
const authService = new AuthService();

module.exports = { authService };
