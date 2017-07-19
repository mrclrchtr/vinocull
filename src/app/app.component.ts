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


  answers: Map<number, Map<string, string>> = new Map([
    [0, new Map([['0', 'Rot'], ['1', 'Weiß'], ['2', 'Rosé']])],
    [1, new Map([['0', 'Leicht'], ['1', 'Mittelkräftig'], ['2', 'Kräftig']])],
    [2, new Map([['0', 'Trocken'], ['1', 'Halbtrocken'], ['2', 'Lieblich']])]
    ]
  );

  possibleResults: Map<string, string> = new Map([
    ['000', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['001', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['010', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['011', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['002', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['020', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['022', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['012', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['021', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['111', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['101', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['110', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['111', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['102', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['120', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['122', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['112', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['121', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['122', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['211', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['201', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['210', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['211', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['202', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['220', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['222', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['212', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['221', 'http://wein-fuer-laien.de/?page_id=1493'],
    ['222', 'http://wein-fuer-laien.de/?page_id=1493'],
  ]);

  selection: Map<number, number> = new Map();

  constructor(private _logger: Logger) {
    this.logger = _logger;
  }

  select(index: number, currentSelection: number) {
    this.logger.info('Selection: ' + currentSelection);
    this.selection.set(index, currentSelection);
    if (index < (this.questions.size) - 1) {
      this.logger.info('Next question');
      this.index++;
    } else {
      this.logger.info('Result: ');
      this.selection.forEach((value, key) => {
        this.logger.info(key, value);
      });

      const resultString: string = '' + this.selection.get(0) + this.selection.get(1) + this.selection.get(2);
      this.logger.info('Result:' + resultString);
      this.logger.info('Redirect to:' + this.possibleResults.get(resultString));
      window.top.location.href = this.possibleResults.get(resultString);
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
