'use client';
import Image from 'next/image';
import styles from './liveSuggestion.module.css';
import { useEffect, useRef, useState } from 'react';
import LargeCard from '@/util/largeCard';

export default function LiveSuggestion() {
	const data_ = {
		sample_channel: [
			{
				username: '샘플스트리머11',
				thumbnailurl: '/sample/11111.png',
				channelid: 'sample',
				streamname: '샘플스트리밍11',
				streamurl: 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8',
				viewerCount: 11,
				userlogo: '/sample/11111.png',
			},
			{
				username: '샘플스트리머22',
				thumbnailurl: '/sample/22222.png',
				channelid: 'sample',
				streamname: '샘플스트리밍22',
				streamurl: 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8',
				viewerCount: 22,
				userlogo: '/sample/22222.png',
			},
		],
		main_live: [
			{
				username: '샘플스트리머1',
				thumbnailurl: '/sample/11111.png',
				channelid: 'sample',
				streamname: '샘플스트리밍1',
				viewerCount: 1,
				userlogo: '/sample/11111.png',
				userid: 'sample',
				category: 'Game',
			},
			{
				username: '샘플스트리머2',
				thumbnailurl: '/sample/22222.png',
				channelid: 'sample',
				streamname: '샘플스트리밍2',
				viewerCount: 2,
				userlogo: '/sample/22222.png',
				userid: 'sample',
				category: 'Just Chatting',
			},
			{
				username: '샘플스트리머3',
				thumbnailurl: '/sample/33333.png',
				channelid: 'sample',
				streamname: '샘플스트리밍3',
				viewerCount: 3,
				userlogo: '/sample/33333.png',
				userid: 'sample',
				category: 'Game',
			},
			{
				username: '샘플스트리머4',
				thumbnailurl: '/sample/44444.png',
				channelid: 'sample',
				streamname: '샘플스트리밍4',
				viewerCount: 5,
				userlogo: '/sample/44444.png',
				userid: 'sample',
				category: 'Just Chatting',
			},
			{
				username: '샘플스트리머5',
				thumbnailurl: '/sample/55555.png',
				channelid: 'sample',
				streamname: '샘플스트리밍5',
				viewerCount: 5,
				userlogo: '/sample/55555.png',
				userid: 'sample',
				category: 'Game',
			},
			{
				username: '샘플스트리머6',
				thumbnailurl: '/sample/66666.png',
				channelid: 'sample',
				streamname: '샘플스트리밍6',
				viewerCount: 6,
				userlogo: '/sample/66666.png',
				userid: 'sample',
				category: 'Just Chatting',
			},
			{
				username: '샘플스트리머7',
				thumbnailurl: '/sample/77777.png',
				channelid: 'sample',
				streamname: '샘플스트리밍7',
				viewerCount: 7,
				userlogo: '/sample/77777.png',
				userid: 'sample',
				category: 'Game',
			},
		],
	};
	return (
		<>
			<Preview data={data_.sample_channel} />
			<section className={styles.cardlist}>
				{data_.main_live.map((live) => (
					<LargeCard
						id={live.channelid}
						streamname={live.streamname}
						thumbnailurl={live.thumbnailurl}
						userid={live.userid}
						userlogo={live.userlogo}
						username={live.username}
						viewerCount={live.viewerCount}
						key={live.channelid}
						category={live.category}
					/>
				))}
			</section>
		</>
	);
}
/**
 *
 * @param {object} param0
 * @param {[{username,thumbnailurl, channelid,streamname,streamurl,viewerCount,userlogo}]} param0.data
 * @returns
 */
function Preview({ data }) {
	const [cur, setcur] = useState(0);
	if (data.length == 0) {
		return (
			<section className={styles.preview}>
				<div className={styles.overview} style={{}}></div>
				<div className={styles.previewLive} style={{ fontSize: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					현재 방송 중인 사람이 없습니다
				</div>
			</section>
		);
	}
	const script = document.createElement('script');
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const Player = useRef(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const player = useRef(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		script.src = 'https://player.live-video.net/1.22.0/amazon-ivs-player.min.js';
		script.onload = () => {
			console.log('player onload');
			Player.current = window.IVSPlayer;
			if (Player.current.isPlayerSupported) {
				player.current = Player.current.create();
				player.current.attachHTMLVideoElement(document.getElementById('streamingvideo'));
				player.current.load(data[0].streamurl);
				player.current.setAutoplay(true);
				player.current.setVolume(0);
			}
		};

		document.body.appendChild(script);
		return () => {
			Player.current = null;
			player.current = null;
		};
	}, []);

	return (
		<section className={styles.preview}>
			<div className={styles.overview}>
				<div className={styles.streaminfo1}>
					<div className={styles.viewer}>
						<span className={styles.live}>LIVE</span>
						<span className={styles.viewercount}>{data[cur].viewerCount}명시청</span>
					</div>
					<p className={styles.streamname}>{data[cur].streamname}</p>
				</div>
				<div className={styles.streaminfo2}>
					<Image className={styles.streamerLogo} src={data[cur].userlogo} alt='스트리머로고' width={50} height={50} />
					<div className={styles.stream}>
						<p className={styles.streamerName}>{data[cur].username}</p>
						<p className={styles.streamCategory}>{data[cur].category}</p>
					</div>
				</div>

				<div className={styles.streamthumbs}>
					{data.map((stream, index) => (
						<button key={index} className={styles.streamthumb} focus={index == cur ? true : false}>
							<Image
								src={stream.thumbnailurl}
								fill
								alt='메인페이지 프리뷰 버튼'
								onClick={(e) => {
									setcur(index);
									if (index != cur) {
										player.current.load(data[index].streamurl);
										player.current.setAutoplay(true);
										player.current.setVolume(0);
										setcur(index);
									}
								}}
							/>
						</button>
					))}
				</div>
			</div>
			<div className={styles.previewLive}>
				<video id='streamingvideo' className={styles.player}></video>
			</div>
		</section>
	);
}
