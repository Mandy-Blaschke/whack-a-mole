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
    {visible: false},
    {visible: false},
    {visible: false},
    {visible: false},
    {visible: false},
    {visible: false},
    {visible: false},
    {visible: false},
    {visible: false}
  ];

  score = 0;

  firstThird = false;
  secondThird = false;
  lastThird = false;

  ngOnInit(): void {
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


  scores(mole: Mole): void {
    if (this.activeGame && mole.visible && this.firstThird) {
      this.score++;
      mole.visible = false;
    } else if (this.activeGame && mole.visible === false && this.firstThird) {
      this.score--;
    }

    if (this.activeGame && mole.visible && this.secondThird) {
      this.score = this.score + 5;
      mole.visible = false;
    } else if (this.activeGame && mole.visible === false && this.secondThird) {
      this.score = this.score - 5;
    }

    if (this.activeGame && mole.visible && this.lastThird) {
      this.score = this.score + 10;
      mole.visible = false;
    } else if (this.activeGame && mole.visible === false && this.lastThird) {
      this.score = this.score - 10;
    }
  }
}


export interface Mole {
  visible: boolean;
}
