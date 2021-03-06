import { Component, OnInit } from '@angular/core';
import {CcinExtractsService} from '../../services/ccin-extracts/ccin-extracts.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {DateUtils} from '../../../common/date.utils';

@Component({
  selector: 'app-ccin-updated',
  templateUrl: './ccin-updated.component.html',
  styleUrls: ['./ccin-updated.component.css']
})
export class CcinUpdatedComponent implements OnInit {
  startDate = new NgbDate(2019, 5, 1);
  endDate = new NgbDate(2019, 12, 31);

  submitted = false;
  loading = false;

  result$: Observable<any[]>;
  err: any;

  constructor(private extractService: CcinExtractsService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.err = null;
    this.submitted = true;
    const startDate = DateUtils.convertNgbDateToString(this.startDate);
    const endDate = DateUtils.convertNgbDateToString(this.endDate);

    this.result$ = this.extractService.getUpdated(startDate, endDate)
      .pipe(
        tap(() => this.loading = false),
        tap(response => console.log(response)),
        catchError(err => {
          this.loading = false;
          this.err = err;
          return of();
        })
      );
  }

}
