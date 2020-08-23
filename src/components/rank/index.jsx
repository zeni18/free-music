import React, { useState, useEffect, memo, useCallback } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { renderRoutes } from "react-router-config"
import { connect } from 'react-redux'
import { getTopList } from '../../api/rank'
import { ERR_OK } from '../../api/config'
import Scroll from '../../controls/scroll'
import Loading from '../../controls/loading'
import { setTopList, setCurrentTab } from '../../store/actions'

import './index.stylus'

function Rank(props) {
	
	const [topicList, setTopicList] = useState([])

	useEffect(() => {
		
		getTopList().then(res => {
			if (res.code === ERR_OK) {
				return res.data.topList
			}
		}).then(data => {
			setTopicList(data)
		})

		if (props.location.pathname === '/rank') {
			props.dispatch(setCurrentTab(2))
		}
	}, [])

	const selectItem = useCallback((item) => {
		const url = `${props.match.url + '/' + item.id}`
 		props.history.push({
			pathname: url
		})
		props.dispatch(setTopList(item))
	}, [])

  return (
    <div className="rank">
			{
				topicList.length ? 
					<Scroll className="toplist" data={topicList}>
						<ul>
							{
								topicList.map((item, index) => {
									return (
												<li className="item" key={index} onClick={() => {selectItem(item)}}>
													<div className="icon">
														<LazyLoadImage
																src={item.picUrl} 
																alt={item.topTitle}
																height={100}
																width={100} 
																effect="blur" />
													</div>
													<ul className="songlist">
														{
															item.songList.map((song, songIndex) => {
																return (
																		<li className="song" key={songIndex}>
																			<span>{songIndex + 1}</span>
																			<span>{song.songname} - {song.singername}</span>
																		</li>
																)
															})
														}
													</ul>
												</li>
									)
								})
							}
				</ul>
			</Scroll>
			:
			<div className="loading-container">
				<Loading title="正在加载..."/>
			</div>
			}
			{ renderRoutes(props.route.routes) }
		</div>
  )
}

export default connect(
	function mapStateToProps(state) {
    return state
  },
	function mapDispatchToProps(dispatch){
		return { dispatch }
})(memo(Rank))