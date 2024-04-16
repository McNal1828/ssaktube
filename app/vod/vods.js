'use client';

import useSWR from 'swr';
import styles from './vods.module.css';
import LargeCard from '@/util/largeCard';

export default function Vods() {
	const fetcher = (...args) => fetch(...args, { cache: 'no-store' }).then((res) => res.json());
	const { data, error, isLoading } = useSWR(`/api/vods?page=1`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateOnMount: true,
	});
	if (isLoading) {
		return (
			<>
				<div>로딩중 입니다.</div>
			</>
		);
	}
	if (error) {
		return (
			<>
				<div>로딩중 에러가 발생했 습니다.</div>
			</>
		);
	}
	console.log(data.data);

	/**
	 * @type {{total_pages,data:[{replay_url,recording_start,recording_end,userid,viewer_count,idx,streamname,nickname,userlogo,duration}]}}
	 */
	const data_ = data.data;
	console.log(data_);
	return (
		<>
			<section className={styles.cardlist}>
				{data_.data.map((live) => (
					<LargeCard
						id={live.idx}
						streamname={live.streamname}
						thumbnailurl={`${live.replay_url}media/thumbnails/thumb0.jpg`}
						userid={live.userid}
						userlogo={live.userlogo}
						username={live.username}
						viewerCount={live.viewer_count}
						type='vod'
						key={live.channelid}
						endtime={live.recording_end}
						starttime={live.recording_start}
						duration={live.duration}
					/>
				))}
			</section>
		</>
	);
}
