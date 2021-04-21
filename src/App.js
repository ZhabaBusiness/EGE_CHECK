import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

const RUSSIAN_TIME = 31 + 28 + 31 + 30 + 31 + 4;


const getCurrentSec = (examen) => {
  let TIME;
  let date = new Date();
  // console.log(`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`)
  // console.log('2021-06-03T10:00:00')
  let currentDate = Date.now();
  switch (examen) {
    case "RUSSIAN":
      TIME = new Date('2021-06-03T10:00:00');
      break;
    case "MATH": {
      TIME = new Date('2021-06-07T10:00:00');
      break;
    }
    case "INF": {
      TIME = new Date('2021-06-24T10:00:00');
      break;
    }
    default:
      break;
  }
  return (TIME - currentDate) / 1000;
  // return (TIME - currentDate) / 1000 / 3600 / 24;
}

let App = () => {
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('RUSSIAN');
  useEffect(() => {
    setTime(getCurrentSec(subject))
    let timer = setInterval(() => {
      setTime(getCurrentSec(subject))
    }, 1000)
    return () => {
      clearInterval(timer)
      setInterval(timer)
    }
  }, [subject])
  return (
    <div id="App">
      <section>
        <header>
          {/* <div>Математика</div> */}
          {subject === "RUSSIAN" && 
          <>
            <div onClick={() => setSubject('MATH')}>Математика</div>
            <div onClick={() => setSubject('INF')}>Информатика</div>
          </>
          }
          {subject === "MATH" && 
          <>
            <div onClick={() => setSubject('RUSSIAN')}>Русский язык</div>
            <div onClick={() => setSubject('INF')}>Информатика</div>
          </>
          }
          {subject === "INF" && 
          <>
            <div onClick={() => setSubject('RUSSIAN')}>Русский язык</div>
            <div onClick={() => setSubject('MATH')}>Математика</div>
          </>
          }
        </header>
        <div className="title">До <span>ЕГЭ</span> по <span style={{color: '#bf4137'}}>
          {subject === "RUSSIAN" && "РУССКОМУ"}
          {subject === "MATH" && "МАТЕМАТИКЕ"}
          {subject === "INF" && "ИНФОРМАТИКЕ"}
        </span> осталось:</div>
        <div className="time">
          <div className="time_section"><div className="time_num">{parseInt((time / (3600 * 24)))}</div> дней</div> 
          <div className="time_section"><div className="time_num">{parseInt((time / 3600 ) % 24)}</div> часов </div>
          <div className="time_section"><div className="time_num">{parseInt( (time / 60) % 60 )}</div> минут </div>
          <div className="time_section"><div className="time_num">{parseInt(time % 60)}</div> секунд</div>
        </div>
      </section>
    </div>
  );
}

export default App;
