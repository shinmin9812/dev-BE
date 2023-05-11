const { UserModel } = require('../schemas/user-schema');

class UserDAO {
	async findUserByEmail(userEmail) {
		const user = await UserModel.findOne({ userEmail });
		return user;
	}

	async findAllUsers() {
		const user = await UserModel.find({});
		return user;
	}

	async createUser(userInfo) {
		const user = await UserModel.create(userInfo);
		return user;
	}

	async updateUser(userEmail, updatedInfo) {
		const user = await UserModel.updateOne({ userEmail }, updatedInfo);
		return user;
	}

	async deleteUser(userEmail) {
		const user = await UserModel.deleteOne({ userEmail, password });
		return user;
	}
}

const userDAO = new UserDAO();

module.exports = { userDAO };
