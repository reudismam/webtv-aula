import { Icon } from '@material-ui/core';
import { useContext } from 'react'
import { HomeContext } from '../context/HomeContext';
import styles from '../styles/Home.module.css';

export default function Home() {
  const {
    videoRef,
    video,
    isPlaying,
    isMute,
    volume,
    currentTime,
    totalTime,
    toonglePlayPause,
    configMute,
    configVolume,
    configCurrentTime
  } = useContext(HomeContext);
  return (
    <div className={styles.container}>
        <div className={styles.video}>
          <video className={styles.conteudo} src={video} ref={videoRef}></video>
           
          <div className={styles.timeContainer}>
            <input 
              className={styles.time}
              type="range"
              min={0}
              max={totalTime}
              value={currentTime}
              onChange={e => configCurrentTime(Number(e.target.value))}
              />
          </div>
          
          <div className={styles.playControls}>
                { isPlaying ?
                  (<Icon className={styles.playIcon} onClick={toonglePlayPause} >pause_circle_filled</Icon>)
                  :
                  (<Icon className={styles.playIcon} onClick={toonglePlayPause} >play_circle_filled</Icon>)
                } 
                { isMute ?
                  (<Icon className={styles.muteIcon} onClick={configMute}>volume_off</Icon>)
                  :
                  (<Icon className={styles.muteIcon} onClick={configMute}>volume_up</Icon>)
                }
                <input className={styles.volumeControl}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={e => configVolume(Number(e.target.value))}
                  >
                </input>
                <div className={styles.timeTotal}>
                  <span>00:00</span> / <span>10:00</span>
                </div>
          </div>
        </div>
    </div>
  )
}
