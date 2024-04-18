'use client';
import useSWR, { useSWRConfig } from 'swr';
import styles from './videos.module.css';
import LargeCard from '@/util/largeCard';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Videos({ userid }) {
	const [which, setwhich] = useState('video');
	const [cur, setcur] = useState(0);
	const [max, setmax] = useState(5);
	const [vw, setvw] = useState(window.innerWidth);
	const resizeListener = () => {
		setvw(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', resizeListener);

		return () => {
			window.removeEventListener('resize', resizeListener);
		};
	}, []);
	useEffect(() => {
		console.log(vw);
		setmax(5);
		if (window.innerWidth < 1600) {
			setmax(4);
		}
		if (window.innerWidth < 1280) {
			setmax(3);
		}
	}, [vw]);
	const { mutate } = useSWRConfig();
	const fetcher = (...args) => fetch(...args, { cache: 'no-store', method: 'POST' }).then((res) => res.json());
	const { data, error, isLoading } = useSWR(`/api/user/${userid}/video`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateOnMount: true,
	});
	if (isLoading) {
		return (
			<div className={styles.video}>
				<div className={styles.header}>
					<div className={styles.label}>
						<h2>동영상</h2>
						<button>
							<Link href={`/user/${userid}/video`}>바로가기버튼</Link>
						</button>
					</div>
				</div>
				<div className={styles.tabsWrapper}>
					<p style={{ marginTop: '20px', marginBottom: '20px' }}>로딩중입니다</p>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className={styles.video}>
				<div className={styles.header}>
					<div className={styles.label}>
						<h2>동영상</h2>
						<button>
							<Link href={`/user/${userid}/video`}>바로가기버튼</Link>
						</button>
					</div>
				</div>
				<div className={styles.tabsWrapper}>
					<p style={{ marginTop: '20px', marginBottom: '20px' }}>로딩중 에러가 발생했습니다.</p>
				</div>
			</div>
		);
	}
	/**
	 * @type {[{replay_url,recording_start,recording_end,viewer_count,userid,idx,streamname,username}]}}
	 */
	const data_ = data.data.data;
	console.log(data_);
	// const data = [
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 1,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 2,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 3,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 4,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 5,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 6,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 7,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 8,
	// 	},
	// 	{
	// 		id: 'BB7tICcZh3OK',
	// 		streamname: '방송이름',
	// 		thumbnailurl: `https://ivs-stream-live-4321.s3.ap-northeast-1.amazonaws.com/ivs/v1/891377305172/BB7tICcZh3OK/2024/4/14/0/58/7KBFvRJ9AWEO/media/latest_thumbnail/thumb.jpg`,
	// 		userid: '',
	// 		userlogo: 'https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/7aa7a4d3-2787-4f8c-afda-d2943e5b12a2.jpg',
	// 		username: '유저이름',
	// 		viewerCount: 9,
	// 	},
	// ];
	return (
		<div className={styles.video}>
			<div className={styles.header}>
				<div className={styles.label}>
					<h2>동영상</h2>
					<button>
						<Link href={`/user/${userid}/video`}>바로가기버튼</Link>
					</button>
				</div>
				<div className={styles.btns}>
					<div className={styles.btngroup}>
						<button
							onClick={(e) => {
								setwhich('video');
								mutate(
									`/api/user/${userid}/video`,
									async (data) => {
										const updatedData_ = await fetch(`/api/user/${userid}/video?sort=latest`, { method: 'POST', cache: 'no-store' });
										const updatedData = await updatedData_.json();
										console.log(data);
										console.log(updatedData);
										return updatedData;
									},
									{ revalidate: false }
								);
							}}
						>
							전체
						</button>
						<button
							onClick={(e) => {
								setwhich('replay');
								mutate(
									`/api/user/${userid}/video`,
									async (data) => {
										const updatedData_ = await fetch(`/api/user/${userid}/replay?sort=latest`, { method: 'POST', cache: 'no-store' });
										const updatedData = await updatedData_.json();
										console.log(data);
										console.log(updatedData);
										return updatedData;
									},
									{ revalidate: false }
								);
							}}
						>
							지난 방송
						</button>
						<button
							onClick={(e) => {
								setwhich('vod');
								mutate(
									`/api/user/${userid}/video`,
									async (data) => {
										const updatedData_ = await fetch(`/api/user/${userid}/vod?sort=latest`, { method: 'POST', cache: 'no-store' });
										const updatedData = await updatedData_.json();
										console.log(data);
										console.log(updatedData);
										return updatedData;
									},
									{ revalidate: false }
								);
							}}
						>
							업로드한 영상
						</button>
					</div>
					<div className={styles.btngroup}>
						<button
							onClick={(e) => {
								mutate(
									`/api/user/${userid}/video`,
									async (data) => {
										const updatedData_ = await fetch(`/api/user/${userid}/${which}?sort=latest`, { method: 'POST', cache: 'no-store' });
										const updatedData = await updatedData_.json();
										console.log(data);
										console.log(updatedData);
										return updatedData;
									},
									{ revalidate: false }
								);
							}}
						>
							최신순
						</button>
						<button
							onClick={(e) => {
								mutate(
									`/api/user/${userid}/video`,
									async (data) => {
										const updatedData_ = await fetch(`/api/user/${userid}/${which}?sort=popular`, { method: 'POST', cache: 'no-store' });
										console.log(updatedData_);
										const updatedData = await updatedData_.json();
										console.log(data);
										console.log(updatedData);
										return updatedData;
									},
									{ revalidate: false }
								);
							}}
						>
							인기순
						</button>
					</div>
				</div>
			</div>
			<div className={styles.tabsWrapper}>
				<span
					className={styles.arrowPrev}
					onClick={(e) => {
						setcur((cur) => cur - 1);
					}}
					style={{ display: cur == 0 ? 'none' : 'flex' }}
				>
					<svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M16.5 20.5 L11 15 L16.5 9.5 ' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'></path>
					</svg>
				</span>
				<div className={styles.tabs} style={{ transform: `translateX(-${cur * (100 / max)}%)` }}>
					{data_.map((item, index) => (
						<LargeCard
							id={item.idx}
							streamname={item.streamname}
							thumbnailurl={`${item.replay_url}media/thumbnails/thumb0.jpg`}
							userid={item.userid}
							userlogo={`https://streamer-userlogo.s3.ap-northeast-1.amazonaws.com/${item.userid}.jpg`}
							username={item.username}
							viewerCount={item.viewer_count}
							type={item.duration ? 'vod' : 'replay'}
							key={index}
							style={{ width: `${100 / max}%`, minWidth: `${100 / max}%` }}
							starttime={item.recording_start}
							endtime={item.recording_end}
							duration={item.duration}
							isCategory={false}
						/>
					))}
				</div>
				<span
					className={styles.arrowNext}
					onClick={(e) => {
						setcur((cur) => cur + 1);
					}}
					style={{ display: cur >= data_.length - max ? 'none' : 'flex' }}
				>
					<svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M13 20.5L18.5 15L13 9.5' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'></path>
					</svg>
				</span>
			</div>
		</div>
	);
}
