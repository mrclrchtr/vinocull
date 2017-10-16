import {Component, OnInit} from '@angular/core';
import {Logger} from 'angular2-logger/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  csv = 'assets/sites.csv';

  logger: Logger;
  httpClient: HttpClient;

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

  possibleResults: Map<string, string>;

  selection: Map<number, number> = new Map();

  constructor(private _logger: Logger, private _httpClient: HttpClient) {
    this.logger = _logger;
    this.httpClient = _httpClient;
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
    this.httpClient.get(this.csv, {responseType: 'text'}).subscribe(csv => {
      console.log(csv);
      this.possibleResults = this.csvToMap(csv);
    });
  }

  private csvToMap(csv) {
    const result: Map<string, string> = new Map();
    const lines = csv.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const currentline = lines[i].split(',');
      result.set(currentline[0], currentline[1]);
    }
    return result;
  }

}
