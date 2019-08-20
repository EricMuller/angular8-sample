import {Injectable} from '@angular/core';
import {QcmApi} from '@app/features/qcm-rest-api/qcm-api';
import {Question} from '../model/question.model'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from './page';
import {Questionnaire} from '../model/questionnaire.model';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';


@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  public getQuestionById(questionId: Number): Observable<Question> {
    return this.http.get<Question>(QcmApi.QUESTIONS + questionId.toString());
  }

  public getQuestionsByQuestionnaireId(questionnaireId: Number): Observable<Question[]> {
    return this.http.get<Question[]>(QcmApi.QUESTIONS + '?questionnaireId=' + questionnaireId.toString());
  }

  public getQuestionsByFilters(criteria: Criteria[], page?: number, size?: number, sort?: string): Observable<Page> {
    console.log(criteria);
    const search = btoa(JSON.stringify(criteria));
    const requestUrl = `${QcmApi.QUESTIONS}?size=${size}&page=${page}&sort=${sort}&search=${search}`;
    return this.http.get<Page>(requestUrl);
  }

  public deleteQuestionById(id: Number) {
    return this.http.delete<Questionnaire>(QcmApi.QUESTIONS + id.toString());
  }

  public getQuestions(page?: number, size?: number, sort?: string): Observable<Page> {
    const requestUrl = `${QcmApi.QUESTIONS}?size=${size}&page=${page}&sort=${sort}`;
    return this.http.get<Page>(requestUrl);
  }

  public getPageQuestionsByQuestionnaireId(questionnaireId: Number): Observable<Page> {
    return this.http.get<Page>(QcmApi.QUESTIONS + '?questionnaireId=' + questionnaireId.toString());
  }

  public postQuestion(q: Question) {
    return this.http.post<Question>(QcmApi.QUESTIONS, q);
  }

  public putQuestion(q: Question) {
    return this.http.put<Question>(QcmApi.QUESTIONS, q);
  }


}
