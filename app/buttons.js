'use client';
import styles from './buttons.module.css';
import ButtonDark from './buttonDark';
import ButtonLogin from './buttonLogin';
import ButtonMy from './buttonMy';
import { useAppSelector } from '@/util/redux/hooks';

export default function Buttons() {
	const { userid } = useAppSelector((state) => state.login);

	return (
		<div className={styles.btns}>
			<ButtonDark />
			{userid ? <ButtonMy userid={userid} userLogo={`https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/${userid}.jpg`} /> : <ButtonLogin />}
		</div>
	);
}
