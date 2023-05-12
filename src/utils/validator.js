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

	const regex = /^[a-zA-Z0-9-_!@#$%&*,.]+$/g;
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

function validateNickname(nickname) {
	const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
	if (nickname.length > 10) {
		throw new Error('닉네임은 10자 이하여야 합니다.');
	}

	if (nickname.includes(' ')) {
		throw new Error('닉네임에는 공백을 사용할 수 없습니다.');
	}

	if (!regex.test(nickname)) {
		throw new Error(
			'닉네임은 알파벳 대소문자, 숫자, 한글만 사용할 수 있습니다.',
		);
	}

	// 모든 조건을 만족하면 유효한 닉네임입니다.
	return true;
}

module.exports = { validateEmail, validatePassword, validateNickname };
