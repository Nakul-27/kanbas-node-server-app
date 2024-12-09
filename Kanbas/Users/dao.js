import model from "./model.js";
export const createUser = (user) => {
	delete user._id
	return model.create(user);
}

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUsersByUsername = (username) => model.findOne({ username: username });
export const findUsersByCredentials = (username, password) => model.findOne({ username, password });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
	const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
	return model.find({
		$or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
	});
};

export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
