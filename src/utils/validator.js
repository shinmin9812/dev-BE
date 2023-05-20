function validateEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regex.test(email)) {
		throw new Error('유효하지 않은 이메일 양식 입니다.');
	}
}

function validatePassword(password) {
	const hasSpecialChar = /[-_!@#$%&*,.]/;
	const hasUpperCase = /[A-Z]/;
	const hasLowerCase = /[a-z]/;
	const hasNumber = /[0-9]/;
	const minLength = 8;
	const regex = /^[a-zA-Z0-9-_!@#$%&*,.]+$/g;

	if (password.length < minLength) {
		throw new Error('비밀번호는 8자 이상이어야 합니다.');
	}

	if (
		!hasSpecialChar.test(password) ||
		!hasUpperCase.test(password) ||
		!hasLowerCase.test(password) ||
		!hasNumber.test(password)
	) {
		throw new Error(
			'대문자, 소문자, 특수 문자, 숫자가 1개 이상 포함되어야 합니다.',
		);
	}

	if (!regex.test(password)) {
		throw new Error('허용되지 않는 문자입니다.');
	}
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

function validateDate(dateInfo) {
	const { year, month, date } = dateInfo;
	if (!year || !month) {
		throw new Error('year과 month는 필수 쿼리입니다.');
	}

	let dateString;
	if (date) dateString = year + '-' + month + '-' + date;
	else dateString = year + '-' + month + '-01';

	const selectedDate = new Date(dateString);
	if (isNaN(selectedDate.getTime())) {
		throw new Error('유효하지 않은 날짜 형식입니다.');
	}
}

module.exports = {
	validateEmail,
	validatePassword,
	validateNickname,
	validateDate,
};
