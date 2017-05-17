import { Injectable } from '@angular/core'
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Observable } from 'rxjs/Observable';

/*@Injectable() 
export class OptionsModel {
  accessToken: string
  refreshToken: string
  constructor(accessToken: string, refreshToken: string) { 
      this.accessToken = accessToken;
      this.refreshToken =refreshToken;
  }
}
*/
export interface Todo { 
  accessToken: string
  refreshToken: string
}
@Injectable()
export class TagService {

    public todos: Observable<Object>;
    private _todos: AsyncSubject<Object>;
    //private example;
  //  activeUser = new BehaviorSubject(null);
  //  source:Observable<number>;
   
    constructor() {
       // this._todos = <AsyncSubject<Object>new AsyncSubject(Object);
        
         this._todos = new AsyncSubject<Object>();
         this.todos = this._todos.asObservable(); 
    }
    register(token: any) {
        //Object.assign({}, token);
     //  this.activeUser.next(Object.assign({}, token))
        this._todos.next(Object.assign({}, token));
        //  this.todos = this._todos.asObservable();
        //var dd = this.todos;
        //   console.log(dd);

    //  this.source = Observable.interval(1000).take(6);
       // this.example = this.source;//.last();
      //  this.todos.last().subscribe({
 //   next: (value) => { console.log(value); },
  //  error: (err) => { console.log('Error: ' + err); },
  //  complete: () => { console.log('complete'); }
//});
    }

    sub() {

        
      //    this.activeUser.subscribe((_user) => {   
    //  console.log(_user);
 //  })
        this.todos.subscribe((_user) => {   
      console.log(_user);})

    }
}