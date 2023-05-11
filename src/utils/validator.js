function validateEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regex.test(email)) {
		throw new Error('유효하지 않은 이메일 양식 입니다.');
	}
}

function validatePassword(password) {
	if (password.length < 8) {
		throw new Error('비밀번호는 8자 이상으로 작성해 주세요!');
	}

	const regex =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/;
	const spaceRegex = /\s/g;

	if (spaceRegex.test(password)) {
		throw new Error('비밀번호에는 공백이 포함될 수 없습니다..');
	}

	if (!regex.test(password)) {
		throw new Error(
			'비밀번호는 8자 이상, 숫자, 대문자, 소문자, 특수문자를 모두 포함해야 합니다.',
		);
	}

	return true;
}

module.exports = { validateEmail, validatePassword };
