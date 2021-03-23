
import React, { Fragment } from 'react';
import Duration from './Duration';
import Timer from './Timer';
import beep1 from '../../sounds/beep1.mp3';
import Navbar from '../other/Navbar';

// import './Pom.css';


class Pom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 1500,
      breakTime: 300
    }

    this.breakTime =  300;
    this.pomodoroStarted = false;
    this.breakStarted = false;
    this.isPaused = false;
    this.audio = new Audio(beep1)
  }
  
  stopTimer = timer => {
    clearInterval(timer);
    timer = null;
  }

  handleStart = () => {
    if (!this.pomodoroStarted) {
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time - 1});
      }, 1000);
      this.pomodoroStarted = !this.pomodoroStarted;
    }

    if (!this.time) {
      this.time = this.state.time;
      this.breakTime = this.state.breakTime;
    }
  }

  handlePause = () => {
    if (this.pomodoroStarted) {
      this.isPaused = true;
      this.setState(this.state);
      if (!this.breakStarted) {
        this.stopTimer(this.timer);
      }

      if (this.breakStarted) {
        this.stopTimer(this.breakTimer)
      }
    }
  }

  handleResume = () => {
    if (this.pomodoroStarted) {
      this.setState(this.state)
      this.isPaused = false;

      if (!this.breakStarted) {
        this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 1 })
        }, 1000);
      }

      if (this.breakStarted) {
        this.breakTimer = setInterval(() => {
          this.setState({ breakTime: this.state.breakTime - 1 })
        }, 1000);
      }
    }
  }

  handleReset = () => {
    this.setState({
      time: 1500,
      breakTime: 300
    })
    this.stopTimer(this.timer);
    this.pomodoroStarted = false;
    this.stopTimer(this.breakTimer);
    this.breakStarted = false;
    this.isPaused = false;
  }

  calculateTime = time => {
    return `${Math.floor(time / 60)} : ${time % 60 > 9 ? "" + time % 60 : "0" + time % 60}`;
  }

  increaseTime = () => {
    if (!this.pomodoroStarted && this.state.time !== 3600) {
      this.setState({ time: this.state.time + 60})
    }
    // console.log('increase session time')
  }

  increaseBreakTime = () => {
    if (!this.pomodoroStarted && this.breakTime !== 1800) {
      this.breakTime = this.breakTime + 60;
      this.setState({ breakTime: this.state.breakTime + 60})
    }
    // console.log('increase break time')
  }

  decreaseTime = () => {
    if (this.state.time > 60 && !this.pomodoroStarted) {
      this.setState({ time: this.state.time - 60 })
    }
    // console.log('decrease session time')
  }

  decreaseBreakTime = () => {
    if (this.breakTime > 60) {
      this.breakTime = this.breakTime - 60;
    }

    if (this.state.breakTime > 60 && !this.pomodoroStarted) {
      this.setState({ breakTime: this.state.breakTime - 60 })
    }
    // console.log('decrease break time')
  }

  componentDidUpdate() {
    if (this.state.time < 1) {
      this.audio.play();
      this.stopTimer(this.timer);
      
      this.setState({ time: this.time });
      if (!this.breakStarted) {
        this.startBreak();
        this.breakStarted = true;
      }
    }

    if (this.state.breakTime < 1) {
      this.audio.play();
      this.stopTimer(this.breakTimer);

      this.setState({ breakTime: this.breakTime });
      this.pomodoroStarted = false;
      this.breakStarted = false;
      this.handleStart();
    }
  }

  startBreak() {
    this.breakTimer = setInterval(() => {
      this.setState({ breakTime: this.state.breakTime - 1 })
    }, 1000);
  }


  render() {
    return (
        <div className='dashboard-and-navbar'>
        <Navbar />
      <div className="Pomt container text-center">
        <h1>Pomodoro Timer</h1>

        <Duration
          sessionLabel="Session Length"
          increaseTime={this.increaseTime}
          decreaseTime={this.decreaseTime}
          sessionLength={
            this.breakStarted
              ? this.calculateTime(this.state.breakTime)
              : this.calculateTime(this.state.time)
          }
          breakLabel="Break Length"
          increaseBreakTime={this.increaseBreakTime}
          decreaseBreakTime={this.decreaseBreakTime}
          breakLength={
            this.breakStarted
              ? this.calculateTime(this.state.time)
              : this.calculateTime(this.state.breakTime)
          }
        />

        <Timer
          handleStart={this.handleStart}
          pauseBtn={this.isPaused ? this.handleResume : this.handlePause}
          condition={this.isPaused ? "Resume" : "Pause"}
          handleReset={this.handleReset}
        />
        {/* <br/>
          <span>#############</span>
        <br/> */}
        
            
            <div class="footerTT">
                <h3> How it works:</h3>
                <ol>
                    <li value="1">Decide on the task to be done.</li>
                    <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
                    <li>End work when the timer rings and put a checkmark on a piece of paper.</li>
                    <li>If you have fewer than four checkmarks, take a short break (5 minutes) and then return to step 2; otherwise continue to step 6</li>
                    <li>After four rotations, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.</li>
                </ol>
                
            </div>
      </div>
    </div>
     
    );
  }
}

export default Pom;