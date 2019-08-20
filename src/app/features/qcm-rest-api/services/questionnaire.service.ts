import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '@app/features/qcm-rest-api/model/question.model';
import {QcmApi} from '@app/features/qcm-rest-api/qcm-api';
import {Questionnaire} from '../model/questionnaire.model';
import {Page} from './page';


import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Observable} from 'rxjs';
import {publishLast, refCount} from 'rxjs/operators';

@Injectable()
export class QuestionnaireService {

  constructor(private http: HttpClient) {
  }

  public getQuestionnaires(page?: number, size?: number, sort?: string): Observable<Page> {
    const requestUrl = `${QcmApi.QUESTIONNAIRES}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<Page>(requestUrl).pipe(publishLast(), refCount());
  }

  public getQuestionnairesByFilters(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page> {
    const search = btoa(JSON.stringify(criteria));
    const requestUrl = `${QcmApi.QUESTIONNAIRES}?size=${size}&page=${page}&sort=${sort}&search=${search}`;
    return this.http.get<Page>(requestUrl).pipe(publishLast(), refCount());
  }

  public deleteQuestionnaireById(id: Number) {
    return this.http.delete<Questionnaire>(QcmApi.QUESTIONNAIRES + id.toString());
  }

  public getQuestionnaireById(id: Number) {
    return this.http.get<Questionnaire>(QcmApi.QUESTIONNAIRES + id.toString());
  }

  public postQuestionnaire(q: Questionnaire) {
    return this.http.post<Questionnaire>(QcmApi.QUESTIONNAIRES, q);
  }

  public putQuestionnaire(q: Questionnaire) {
    return this.http.put<Questionnaire>(QcmApi.QUESTIONNAIRES, q);
  }

  public getPageQuestionsProjectionByQuestionnaireId(questionnaireId: Number): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(QcmApi.QUESTIONNAIRES + questionnaireId.toString() + '/questions')
      .pipe(publishLast(), refCount());
  }

  public putQuestion(id: Number, question: Question) {
    return this.http.put<Questionnaire>(QcmApi.QUESTIONNAIRES + id.toString() + '/questions', question);
  }

}
