const { hashedPassword } = require('../utils/hashing');
const { userDAO } = require('../db/dao/user-dao');

class UserService {
	async getUserByEmail(userEmail) {
		const user = await userDAO.findUserByEmail(userEmail);
		return user;
	}

	async getAllUsers() {
		const user = await userDAO.findAllUsers();
		return user;
	}

	async createUser(userInfo) {
		const { userEmail, nickname, password } = userInfo;
		const hashedPwd = await hashedPassword(password);
		const user = await userDAO.createUser({
			userEmail,
			nickname,
			password: hashedPwd,
		});
		return user;
	}

	async updateUser(userEmail, updatedInfo) {
		const { password, nickname } = updatedInfo;
		const hashedPwd = await hashedPassword(password);
		const user = await userDAO.updateUser(userEmail, {
			password: hashedPwd,
			nickname,
		});
		return user;
	}

	async deleteUser(userEmail) {
		const user = await userDAO.deleteUser(userEmail);
		return user;
	}

	async verifyPassword(userPassword, hashedPassword) {
		return await bcrypt.compare(userPassword, hashedPassword);
	}
}

const userService = new UserService();
module.exports = { userService };
