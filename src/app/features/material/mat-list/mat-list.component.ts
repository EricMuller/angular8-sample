import {Component, OnInit} from '@angular/core';
import {JsonService} from '../json.service';
import {Post} from '../Post';
import {QuestionnaireService} from '@app/features/qcm-rest-api/services/questionnaire.service';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';

@Component({
  selector: 'app-mat-list',
  templateUrl: './mat-list.component.html',
  styleUrls: ['./mat-list.component.scss']
})
export class MatListComponent implements OnInit {

  posts: Post[] = [];
  questionnaires: Questionnaire[];

  constructor(private jsonService: JsonService, private questionnaireService: QuestionnaireService) {
  }

  ngOnInit() {
    this.getPosts();
    this.getQuestionnaires();
  }

  getQuestionnaires() {

    this.questionnaireService.getQuestionnaires(0, 100, 'id').subscribe(
      items => {
        this.questionnaires = items.content;
      });

  }

  getPosts() {

    if (this.posts.length === 0) {
      this.jsonService.getPosts()
        .subscribe(
          items => {
            this.posts = items;
          });
    }
  }
}
