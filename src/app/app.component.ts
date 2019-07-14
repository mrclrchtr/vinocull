import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  csv = 'assets/sites.csv';

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

  constructor(private _httpClient: HttpClient) {
    this.httpClient = _httpClient;
  }

  select(index: number, currentSelection: number) {
    console.log('Selection: ' + currentSelection);
    this.selection.set(index, currentSelection);
    if (index < (this.questions.size) - 1) {
      console.log('Next question');
      this.index++;
    } else {
      console.log('Result: ');
      this.selection.forEach((value, key) => {
        console.log(key, value);
      });

      const resultString: string = '' + this.selection.get(0) + this.selection.get(1) + this.selection.get(2);
      console.log('Result:' + resultString);
      console.log('Redirect to:' + this.possibleResults.get(resultString));

      window.top.location.href = this.possibleResults.get(resultString);
    }
  }

  back() {
    console.log('Back');
    this.index--;
  }

  public ngOnInit() {
    console.log('Initialized AppComponent');
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
