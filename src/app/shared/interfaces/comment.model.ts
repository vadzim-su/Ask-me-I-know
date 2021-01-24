export default class Comment {
  author: string;
  date: number;
  text: string;
  id?: string;
  isSolution: boolean;

  constructor(newComment) {
    this.author = newComment.author;
    this.date = newComment.date;
    this.text = newComment.text;
    this.id = newComment.id;
    this.isSolution = newComment.isSolution;
  }
}
