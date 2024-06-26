import React, { useState } from 'react';
import styles from './index.module.scss';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

//  npm install react
//  npm install react react-dom
//  由于UI注释链接打不开，只能照着图片写，部分细节可能不够准确


const App = () => {
  const [redEnvelopeList, setRedEnvelopeList] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, []);
  //接口调用
  const fetchData = async () => {
    try {
      const data = await axios.get('https://systemjs.1688.com/krump/schema/1352.json');
      setRedEnvelopeList(data?.data?.list);
    } catch (error) {
      console.error(error);
    }
  };

  // 倒计时
  const ItemCountdown = (restTime:any) => {
    const [timeLeft, setTimeLeft] = useState(restTime?.restTime);
    useEffect(() => {
      if (timeLeft <= 0) {
        return;
      }
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }, [timeLeft]);
    // 格式化剩余时间
    const formatTime = () => {
      let hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
      let minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
      let seconds = (timeLeft % 60).toString().padStart(2, '0');
      return (
        <>
          <span className={styles.countdownTime}>{hours}</span>:
          <span className={styles.countdownTime}>{minutes}</span>:
          <span className={styles.countdownTime}>{seconds}</span>
        </>
      );

    };

    return <span className={styles.time}>距结束{formatTime()}</span>;
  };


  //日期
  const dateRange = (time: any[]) => {
    return time.map((timestamp, index) => {
      const formattedDate = moment(timestamp).format('MM-DD HH:mm');
      return (
        <>
          <span className={styles.time}>{formattedDate}</span>{index === 0 ? ' — ' : ''}
        </>
      );
    });
  };

  const submit = (item: any) => {
    console.log(item, 'submit');
  }

  return (
    <div className={styles.wrap}>
      {redEnvelopeList?.length > 0 ?
        redEnvelopeList?.map((item: any) => (
          <div className={styles.framework} style={{ display: 'flex', width: '100%' }}>
            <div className={styles.price} >
              <span className={styles.span}>{item?.money}</span>
              <span className={styles.currencyUnit}>元</span>
            </div>

            <div className={styles.centerDiv} >
              <span className={styles.spacingTop}>{item?.title}</span>
              <span className={styles.spacingCenter}>{item?.description}</span>

              {item?.restTime
                ?
                <ItemCountdown restTime={item?.restTime} />
                :
                <span className={styles.time}>有效期: {dateRange(item?.time)}</span>
              }
            </div>

            <div className={styles.buttonDiv}>
              <button className={styles.button} onClick={() => { submit(item) }}>
                {item?.status}
              </button>
            </div>
          </div>
        ))
        :
        <div className={styles.img}>
          <img src="https://img.war6sky.com/resources/images/PlaceholderMap.png" alt="" />
        </div>
      }

    </div>


  );
};

export default App;
