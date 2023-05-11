const bcrypt = require('bcrypt');
const { hashedPassword } = require('../utils/hashing');
const { userDAO } = require('../db/dao/user-dao');
const { validateEmail, validatePassword } = require('../utils/validator');

class UserService {
	async getUserByEmail(userEmail) {
		try {
			const user = await userDAO.findUserByEmail(userEmail);
			if (!user) {
				throw new Error(`이메일이 ${userEmail}인 유저가 존재하지 않습니다.`);
			}
			return user;
		} catch (err) {
			throw new Error('유저 조회에 실패했습니다.');
		}
	}

	async getAllUsers() {
		try {
			const users = await userDAO.findAllUsers();
			if (!users.length) {
				throw new Error('등록된 유저가 없습니다.');
			}
			return users;
		} catch (err) {
			throw new Error('유저 조회에 실패했습니다.');
		}
	}

	async createUser(userInfo) {
		const { userEmail, nickname, password } = userInfo;
		const hashedPwd = await hashedPassword(password);

		// 이메일, 닉네임, 패스워드 중 하나라도 빈 값인 경우
		if (!userEmail) {
			throw new Error('이메일이 빈 값입니다.');
		}
		if (!nickname) {
			throw new Error('닉네임이 빈 값입니다.');
		}
		if (!password) {
			throw new Error('패스워드가 빈 값입니다.');
		}

		// 이미 존재하는 이메일인지 검사
		const existingUser = await userDAO.findUserByEmail(userEmail);
		if (existingUser) {
			throw new Error('이미 존재하는 이메일입니다.');
		}

		//이메일 유효성 검사
		validateEmail(userEmail);

		//비밀번호 유효성 검사
		validatePassword(password);

		try {
			const user = await userDAO.createUser({
				userEmail,
				nickname,
				password: hashedPwd,
			});
			return user;
		} catch (err) {
			throw new Error('유저 생성에 실패했습니다.');
		}
	}

	async updateUser(userEmail, updatedInfo) {
		const { password, nickname } = updatedInfo;
		const hashedPwd = await hashedPassword(password);

		if (!nickname) {
			throw new Error('닉네임이 빈 값입니다.');
		}
		if (!password) {
			throw new Error('패스워드가 빈 값입니다.');
		}

		//비밀번호 유효성 검사
		validatePassword(password);

		try {
			const { modifiedCount } = await userDAO.updateUser(userEmail, {
				password: hashedPwd,
				nickname,
			});
			if (!modifiedCount) {
				throw new Error(`이메일이 ${userEmail}인 유저가 존재하지 않습니다.`);
			}
			return;
		} catch (err) {
			throw new Error(`유저 업데이트에 실패했습니다.: ${err.message}`);
		}
	}

	async deleteUser(userEmail, typedPassword) {
		//비밀번호 검증
		const hashedPwd = await hashedPassword(typedPassword);
		await this.verifyPassword(typedPassword, hashedPwd);

		try {
			const { deletedCount } = await userDAO.deleteUser({
				userEmail,
			});

			if (!deletedCount) {
				throw new Error(`이메일이 ${userEmail}인 유저가 존재하지 않습니다.`);
			}

			return;
		} catch (err) {
			throw new Error(`유저 삭제에 실패했습니다: ${err.message}`);
		}
	}

	async verifyPassword(userPassword, hashedPassword) {
		try {
			return await bcrypt.compare(userPassword, hashedPassword);
		} catch (err) {
			throw new Error('비밀번호 검증에 실패했습니다.');
		}
	}
}

const userService = new UserService();
module.exports = { userService };
