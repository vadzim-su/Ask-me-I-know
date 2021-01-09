import Comment from './comment.model';

export default class Question {
  author: string;
  date: number;
  tags: string[];
  text: string;
  title: string;
  id?: string;
  comments: Comment[];

  constructor(newQuestionInfo) {
    this.author = newQuestionInfo.author;
    this.date = newQuestionInfo.date;
    this.tags = newQuestionInfo.tags;
    this.text = newQuestionInfo.text;
    this.title = newQuestionInfo.title;
    this.id = newQuestionInfo.id;
    this.comments = newQuestionInfo.comments;
  }
}
