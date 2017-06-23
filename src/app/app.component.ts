import {Component, OnInit} from '@angular/core';
import {Logger} from 'angular2-logger/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  logger: Logger;

  index = 0;

  questions: Map<number, string> = new Map([
    [0, 'Welche Weinfarbe ist dein Favorit?'],
    [1, 'Welchen Geschmack bevorzugst du?'],
    [2, 'Wie süß magst du deinen Wein?']
  ]);


  answers: Map<number, Map<number, string>> = new Map([
      [0, new Map([[0, 'Rot'], [1, 'Weiß'], [2, 'Rose']])],
      [1, new Map([[0, 'Leicht'], [1, 'Mittelmäßig'], [2, 'Kräftig']])],
      [2, new Map([[0, 'Trocken'], [1, 'Halbtrocken'], [2, 'Lieblich']])]
    ]
  );

  selection: Map<number, number> = new Map();

  constructor(private _logger: Logger) {
    this.logger = _logger;
  }

  select(index: number, selection: number) {
    this.logger.info('Selection: ' + selection);
    this.selection.set(index, selection);
    if (index < (this.questions.size) - 1) {
      this.logger.info('Next question');
      this.index++;
    } else {
      this.logger.info('Result: ');
      this.selection.forEach((value, key) => {
        this.logger.info(key, value);
      })
    }
  }

  back() {
    this.logger.info('Back');
    this.index--;
  }

  public ngOnInit() {
    this.logger.debug('Initialized AppComponent');
  }

}
