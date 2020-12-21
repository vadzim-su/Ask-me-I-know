import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Info from '../../models/info.model';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private dbPath = '/questions';
  questionInfo: AngularFireList<Info> = null;

  constructor(private db: AngularFireDatabase) {
    this.questionInfo = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Info> {
    return this.questionInfo;
  }

  create(tutorial: Info): any {
    return this.questionInfo.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.questionInfo.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.questionInfo.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.questionInfo.remove();
  }
}
