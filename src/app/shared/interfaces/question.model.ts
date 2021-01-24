import Comment from './comment.model';

export default class Question {
  author: string;
  date: number;
  tags: string[];
  text: string;
  title: string;
  id?: string;
  isModerated: false;
  comments: Comment[];
  hasSolution: false;

  constructor(newQuestionInfo) {
    this.author = newQuestionInfo.author;
    this.date = newQuestionInfo.date;
    this.tags = newQuestionInfo.tags;
    this.text = newQuestionInfo.text;
    this.title = newQuestionInfo.title;
    this.id = newQuestionInfo.id;
    this.isModerated = newQuestionInfo.isModerated;
    this.comments = newQuestionInfo.comments;
    this.hasSolution = newQuestionInfo.hasSolution;
  }
}
