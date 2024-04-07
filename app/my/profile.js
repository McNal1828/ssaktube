'use client';
import { useEffect } from 'react';
import styles from './profile.module.css';

export default function Profile() {
	useEffect(() => {
		document.getElementById('nickname').setAttribute('disabled', true);
		document.getElementById('nicknamebtn').setAttribute('disabled', true);
	}, []);

	return (
		<>
			<div>
				<h2 className={styles.title}>회원정보설정</h2>
				<div className={styles.sub}>
					<div className={styles.nick}>
						<h4 className={styles.subtitle}>닉네임변경</h4>
						<input
							type='checkbox'
							onChange={(e) => {
								if (e.target.checked) {
									document.getElementById('nickname').removeAttribute('disabled');
									document.getElementById('nicknamebtn').removeAttribute('disabled');
								} else {
									document.getElementById('nickname').setAttribute('disabled', true);
									document.getElementById('nicknamebtn').setAttribute('disabled', true);
								}
							}}
						></input>
					</div>
					<div className={styles.change}>
						<input id='nickname' type='text'></input>
						<button
							id='nicknamebtn'
							onClick={(e) => {
								alert('닉네임 변경');
							}}
						>
							변경하기
						</button>
					</div>
				</div>
				<div className={styles.sub}>
					<h4 className={styles.subtitle}>비밀번호변경</h4>
					<div className={styles.change}>
						<input type='text' placeholder='변경하고 싶은 비밀번호를 입력해주세요'></input>
						<button
							onClick={(e) => {
								alert('비밀번호 변경 버튼');
							}}
						>
							변경하기
						</button>
					</div>
				</div>
			</div>
		</>
	);
}