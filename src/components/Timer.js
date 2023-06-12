import React, { useState , useEffect} from 'react';
import './timer.css'

function Timer() {
    const [time, setTime] = useState({hours:'00',minutes:'00',seconds:'00'});
    const [textButton , setTextButton] = useState('start');
    const [countdownTimer, setCountdownTimer] = useState(null);

    const startTimer = () => {
        setTime((prevTime) => {
            let updatedTime = { ...prevTime };
            console.log(prevTime,'pt');
        if (parseInt(prevTime.seconds)>60){
            updatedTime.seconds=`${parseInt(prevTime.seconds)-60}`.padStart(2, '0');
            updatedTime.minutes=`${parseInt(prevTime.minutes)+1}`.padStart(2, '0');
            // setTime(timer=>({...timer,minutes:time.minutes+1,seconds:parseInt(time.seconds)-60}))
        }
        if(parseInt(prevTime.minutes)>60){
            updatedTime.minutes=`${parseInt(updatedTime.minutes)-60}`.padStart(2, '0');
            updatedTime.hours=`${parseInt(updatedTime.hours)+1}`.padStart(2, '0');
            // setTime(timer=>({...timer,minutes:parseInt(time.minutes)-60,hours:time.hours+1}))
        }
        if(parseInt(prevTime.seconds)=='00' && parseInt(prevTime.minutes)=='00' && parseInt(prevTime.hours)=='00') {
            setTime({hours:'00',minutes:'00',seconds:'00'});
            console.log('inside',prevTime);
            handleStopTimer();
        }
        else if (parseInt(prevTime.seconds)!='00'){
            console.log('starttimer',prevTime);
            updatedTime.seconds = `${parseInt(updatedTime.seconds) - 1}`.padStart(2, '0');
            // setTime((timer=>({...timer,seconds:`${timer.seconds<=10 ? '0' :''}${parseInt(timer.seconds)-1}`})))
        }
        else if (parseInt(prevTime.minutes)!= '00' && parseInt(prevTime.seconds)=='00'){
            updatedTime.minutes = `${parseInt(updatedTime.minutes) - 1}`.padStart(2, '0');
            updatedTime.seconds = 59;
            // setTime((timer=>({...timer,seconds:59,minutes:`${timer.minutes<=10 ? '0' :''}${parseInt(timer.minutes)-1}`}))) 
        }
        else{
            updatedTime.seconds = 59;
            updatedTime.minutes = 59;
            updatedTime.hours = `${parseInt(updatedTime.hours) - 1}`.padStart(2, '0');
            // setTime(timer=>({hours:`${timer.hours<=10 ? '0' :''}${parseInt(timer.hours)-1}`,minutes:59,seconds:59}))
        }
        return updatedTime;

    })}

    const startInterval = () =>{
        const countTimer = setInterval(()=>{
            startTimer();
        },1000);
        setCountdownTimer(countTimer);
    }

    const handleStartTimer = () => {
        if (time.seconds==='00' && time.minutes==='00' && time.hours==='00') return
        startInterval();
        setTextButton('stop');
    }
    const handleStopTimer = () => {
        clearInterval(countdownTimer);
        setCountdownTimer(null);
        setTextButton('start');
    }
    const handleResetTimer = () => {
        handleStopTimer();
        setTime({hours:'00',minutes:'00',seconds:'00'});
        setTextButton('start');
    }

    useEffect(() => {
        return () => {
          if (countdownTimer) {
            clearInterval(countdownTimer);
          }
        };
      }, [countdownTimer]);
    console.log(time,'out');

  return (
    <div className='mainContainer'>
        <div className='title'>Countdown Timer</div>
        <div className='container'>
            <div className='header'>
               <span>Hours</span> 
               <span>Minutes</span> 
               <span>Seconds</span> 
            </div>
            <div className='inputContainer'>
                <input
                type='number'
                maxLength={2}
                placeholder='00'
                value={time.hours}
                onChange={(e)=>setTime((time)=> ({...time,hours:e.target.value.slice(0,2)}))}
                />
                <span>:</span>
                <input
                type='number'
                maxLength={2}
                placeholder='00'
                value={time.minutes}
                onChange={(e)=>setTime((time)=> ({...time,minutes:e.target.value.slice(0,2)}))}
                />
                <span>:</span>
                <input
                type='number'
                maxLength={2}
                placeholder='00'
                value={time.seconds}
                onChange={(e)=>setTime((time)=> ({...time,seconds:e.target.value.slice(0,2)}))}
                />
            </div>
            <div className='buttonContainer'>
                <button className='start' style={{display:textButton=='stop' ? 'none':''}} onClick={handleStartTimer}>Start</button>
                <button className='stop' style={{display:textButton=='start' ? 'none':''}} onClick={handleStopTimer}>Stop</button>
                <button className='reset' onClick={handleResetTimer}>Reset</button>
            </div>
        </div>
    </div>
  )
}

export default Timer