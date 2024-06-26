'use client';
import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';
import Spinner from '@/util/spinner';
import { useDispatch } from 'react-redux';
import { setuserid } from '@/util/redux/reducers/login';

export default function Profile({ username, myinfo_ }) {
	const [nusername, setnusername] = useState(username);
	const [myinfo, setmyinfo] = useState(myinfo_);
	const [opassword, setopassword] = useState('');
	const [npassword, setnpassword] = useState('');
	const [iconChange, seticonChange] = useState(false);
	const [nickChange, setnickChange] = useState(false);
	const [passChange, setpassChange] = useState(false);
	const [introChange, setintroChange] = useState(false);
	const [file, setfile] = useState(null);
	useEffect(() => {
		document.getElementById('nickname').setAttribute('disabled', true);
		document.getElementById('nicknamebtn').setAttribute('disabled', true);
		document.getElementById('deleteuser').setAttribute('disabled', true);
	}, []);
	const router = useRouter();
	const dispatch = useDispatch();
	console.log('profile.js');
	console.log(username);
	console.log(myinfo_);
	return (
		<>
			<div>
				<h2 className={styles.title}>회원정보설정</h2>
				<div className={styles.sub}>
					<h4 className={styles.subtitle}>아이콘 변경</h4>
					<div className={styles.change}>
						<input
							type='file'
							onChange={(e) => {
								const files = e.target.files;
								if (files) {
									setfile(files[0]);
								}
							}}
							style={{ height: 'fit-content' }}
						></input>
						<button
							onClick={(e) => {
								seticonChange(true);
								setTimeout(() => {
									alert('아이콘 변경 완료');
									router.refresh();
									seticonChange(false);
								}, 500);
							}}
						>
							변경하기
						</button>
						{iconChange ? (
							<div className={styles.spinner}>
								<Spinner width={30} height={30} />
							</div>
						) : (
							''
						)}
					</div>
				</div>
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
						<input
							id='nickname'
							type='text'
							value={nusername}
							placeholder={nusername}
							onChange={(e) => {
								setnusername(e.target.value);
							}}
						></input>
						<button
							id='nicknamebtn'
							onClick={(e) => {
								setnickChange(true);
								setTimeout(() => {
									alert('닉네임 변경 완료');
									router.refresh();
									setnickChange(false);
								}, 500);
							}}
						>
							변경하기
						</button>
						{nickChange ? (
							<div className={styles.spinner}>
								<Spinner width={30} height={30} />
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<div className={styles.sub}>
					<h4 className={styles.subtitle}>비밀번호변경</h4>
					<div className={styles.change}>
						<input
							type='password'
							placeholder='현재 비밀번호를 입력해주세요'
							onChange={(e) => {
								setopassword(e.target.value);
							}}
							style={{ width: '375px' }}
						></input>
					</div>
					<div className={styles.change}>
						<input
							type='password'
							placeholder='변경하고 싶은 비밀번호를 입력해주세요'
							onChange={(e) => {
								setnpassword(e.target.value);
							}}
						></input>
						<button
							onClick={(e) => {
								setpassChange(true);
								setTimeout(() => {
									alert('비밀번호 변경 완료');
									router.refresh();
									setpassChange(false);
								}, 500);
							}}
						>
							변경하기
						</button>
						{passChange ? (
							<div className={styles.spinner}>
								<Spinner width={30} height={30} />
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<div className={styles.sub}>
					<h4 className={styles.subtitle}>자기소개 변경</h4>
					<div className={styles.change}>
						<input
							type='text'
							value={myinfo}
							onChange={(e) => {
								setmyinfo(e.target.value);
							}}
						></input>
						<button
							onClick={(e) => {
								setintroChange(true);
								setTimeout(() => {
									alert('자기소개 변경 완료');
									router.refresh();
									setintroChange(false);
								}, 500);
							}}
						>
							변경하기
						</button>
						{introChange ? (
							<div className={styles.spinner}>
								<Spinner width={30} height={30} />
							</div>
						) : (
							''
						)}
					</div>
				</div>
				<div className={styles.sub}>
					<div className={styles.nick}>
						<h4 className={styles.subtitle}>탈퇴버튼</h4>
						<input
							type='checkbox'
							onChange={(e) => {
								if (e.target.checked) {
									document.getElementById('deleteuser').removeAttribute('disabled');
								} else {
									document.getElementById('deleteuser').setAttribute('disabled', true);
								}
							}}
						></input>
						<button
							id='deleteuser'
							variant='outline'
							className={styles.button}
							onClick={(e) => {
								alert('회원탈퇴 완료');
								fetch('/api/user/logout', { method: 'POST' })
									.then((res) => res.json())
									.then((data) => {
										router.push('/');
										router.refresh();
										dispatch(setuserid(null));
									});
							}}
							style={{ marginLeft: '20px' }}
						>
							회원탈퇴
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
