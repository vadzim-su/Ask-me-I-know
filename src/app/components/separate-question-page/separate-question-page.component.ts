import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Comment from 'src/app/models/comment.model';
import Question from 'src/app/models/question.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-separate-question-page',
  templateUrl: './separate-question-page.component.html',
  styleUrls: ['./separate-question-page.component.scss'],
})
export class SeparateQuestionPageComponent implements OnInit {
  id: string;
  isAdmin: boolean = true;
  singleQuestion: Question;
  commentTextForm: FormControl;
  // newComment: Comment;

  constructor(
    public questionService: QuestionService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.commentTextForm = new FormControl();
    this.id = this.route.snapshot.params.id;

    this.questionService
      .getSeparateQuestionByID(this.id)
      .then((data: Question) => {
        this.singleQuestion = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNewComment() {
    const newUsersComment: Comment = {
      author: this.authService.userEmail,
      date: +new Date(),
      text: this.commentTextForm.value,
      isSolution: false,
    };

    this.singleQuestion.comments.push(newUsersComment);
    this.questionService.addComment(this.id, {
      comments: this.singleQuestion.comments,
    });
    this.commentTextForm.reset();
  }
}
