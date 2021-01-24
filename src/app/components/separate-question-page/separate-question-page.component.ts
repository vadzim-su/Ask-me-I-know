import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import Comment from 'src/app/shared/interfaces/comment.model';
import Question from 'src/app/shared/interfaces/question.model';

@Component({
  selector: 'app-separate-question-page',
  templateUrl: './separate-question-page.component.html',
  styleUrls: ['./separate-question-page.component.scss'],
  host: {
    class: 'position-relative',
  },
})
export class SeparateQuestionPageComponent implements OnInit {
  id: string;
  isLoading: boolean = true;
  isAdmin: boolean = true;
  singleQuestion: Question;
  commentTextForm: FormControl;
  userEmail: string;

  constructor(
    public questionService: QuestionService,
    private route: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((useremail) => {
      this.userEmail = useremail;
    });

    this.commentTextForm = new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.id = this.route.snapshot.params.id;

    this.questionService
      .getSeparateQuestionByID(this.id)
      .then((data: Question) => {
        this.singleQuestion = data;
      })
      .then(() => {
        this.isLoading = false;
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
    this.questionService.update(this.id, {
      comments: this.singleQuestion.comments,
    });
    this.commentTextForm.reset();
  }

  approveQuestion() {
    this.questionService.update(this.id, { isModerated: true }).then(() => {
      this.router.navigate(['']);
    });
  }

  deleteQuestion() {
    this.questionService.delete(this.id).then(() => {
      this.router.navigate(['']);
    });
  }

  noteSolution(comment: Comment) {
    comment.isSolution = true;
    this.questionService.update(this.id, {
      hasSolution: true,
      comments: this.singleQuestion.comments,
    });
  }

  editQuestion() {}
}
