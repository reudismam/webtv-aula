import { Icon } from '@material-ui/core';
import { useContext } from 'react'
import { HomeContext } from '../context/HomeContext';
import styles from '../styles/Home.module.css';
import {AiFillStar} from 'react-icons/ai';

export default function Home() {
  const {
    videoRef,
    video
  } = useContext(HomeContext);
  return (
    <div className={styles.container}>
        <div className={styles.video}>
          <video className={styles.conteudo} src={video} ref={videoRef}></video>

          <div className={styles.playControls}>
                <Icon className={styles.playIcon}>play_circle_filled</Icon>
                <div className={styles.time}>
                  <span>00:00</span> / <span>10:00</span>
                </div>
          </div>
        </div>
    </div>
  )
}
