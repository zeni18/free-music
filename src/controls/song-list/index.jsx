import React, {useCallback, memo} from 'react'

import './index.stylus'

const SongList = function(props) {
	const songs = props.songs

	const selectItem = useCallback(function(song, index) {
		props.select(song, index)
	}, [])

	return (
		<div className="song-list">
			<ul>
				{
					songs.map((song, index) => {
					  return(
						<li className="item" key={song.id} onClick={() => selectItem(song, index)}>
							<div className="content">
								<h2 className="name">{song.name}</h2>
								<p className="desc">{`${song.singer} . ${song.album}`}</p>
							</div>
						</li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default memo(SongList)