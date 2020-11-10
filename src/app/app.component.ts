import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  activeGame = false;
  finishedGame = false;
  playDuration = 90000;

  moles: Mole[] = [
    {visible: false}, {visible: false}, {visible: false},
    {visible: false}, {visible: false}, {visible: false},
    {visible: false}, {visible: false}, {visible: false},
  ];

  score = 0;

  firstThird = false;
  secondThird = false;
  lastThird = false;


  ngOnInit(): void {
    this.preLoadAudios();
  }

  private gameplayTimer(): void {
    this.activeGame = true;
    this.firstThird = true;

    setTimeout(() => {
      this.playingGame();
      this.firstThird = false;
      this.secondThird = true;
    }, 10000);

    setTimeout(() => {
      this.secondThird = false;
      this.lastThird = true;
      this.playingGame();
    }, 20000);

    setTimeout(() => {
      this.endGame();
      this.lastThird = true;
    }, this.playDuration);
  }

  startGame(): void {
    this.finishedGame = false;
    this.gameplayTimer();
    this.playingGame();
  }

  private endGame(): void {
    this.moles.forEach((mole) => mole.visible = false);
    this.activeGame = false;
    this.finishedGame = true;
  }

  private playingGame(): void {
    if (this.activeGame) {
      setTimeout(() => {
        this.showAMole();
      }, 1000);
    }
  }

  private showAMole(): void {
    const randomMole = this.moles[Math.floor(Math.random() * this.moles.length)];
    setTimeout(() => {
      randomMole.visible = true;
    }, 1000);
    setTimeout(() => {
      randomMole.visible = false;
    }, 2300);
    this.playingGame();
  }


  countScore(mole: Mole): void {
    if (this.activeGame && mole.visible && this.firstThird) {
      this.score++;
      this.playAudioA();
      mole.visible = false;
    } else if (this.activeGame && mole.visible === false && this.firstThird) {
      this.score--;
      this.playAudioB();
    }

    if (this.activeGame && mole.visible && this.secondThird) {
      this.score = this.score + 5;
      this.playAudioA();
      mole.visible = false;
    } else if (this.activeGame && mole.visible === false && this.secondThird) {
      this.score = this.score - 5;
      this.playAudioB();
    }

    if (this.activeGame && mole.visible && this.lastThird) {
      this.score = this.score + 10;
      this.playAudioA();
      mole.visible = false;
    } else if (this.activeGame && mole.visible === false && this.lastThird) {
      this.score = this.score - 10;
      this.playAudioB();
    }
  }

  preLoadAudios(): void {
    const audioA = new Audio();
    audioA.src = 'assets/smashing.mp3';
    audioA.load();

    const audioB = new Audio();
    audioB.src = 'assets/buzzer.mp3';
    audioB.load();
  }


  playAudioA(): void {
    const audio = new Audio();
    audio.src = 'assets/smashing.mp3';
    audio.load();
    audio.play();
  }

  playAudioB(): void {
    const audio = new Audio();
    audio.src = 'assets/buzzer.mp3';
    audio.load();
    audio.play();
  }
}


export interface Mole {
  visible: boolean;
}
