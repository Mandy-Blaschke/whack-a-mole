import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  game: boolean;
  gameEnded = false;

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

  counter = 0;

  ngOnInit(): void {
  }

  startGame(): void {
    this.gameplayTimer();
    this.gameplay();
  }

  gameplayTimer(): void {
    this.game = true;
    setTimeout(() => {
      console.log('Spiel beendet');
      this.moles.forEach( (mole) => mole.visible = false);
      this.game = false;
      this.gameEnded = true;
    }, 30000);
  }

  gameplay(): void {
    if (this.game) {
      setTimeout(() => {
        this.showAMole();
      }, 1000);
    }
  }

  showAMole(): void {
    const randomMole = this.moles[Math.floor(Math.random() * this.moles.length)];
    setTimeout(() => {
      randomMole.visible = true;
    }, 1000);
    setTimeout(() => {
      randomMole.visible = false;
    }, 2000);
    this.gameplay();
  }


  scores(mole): void {
    if (this.game && mole.visible) {
      this.counter++;
      mole.visible = false;
    } else if (this.game && mole.visible === false) {
      this.counter--;
    }
  }
}

export interface Mole {
  visible: boolean;
}
