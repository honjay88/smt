import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class CategoryService {
  private SQLitestorage: SQLite;
  constructor() {
    this.SQLitestorage = new SQLite();
    this.SQLitestorage.openDatabase({
      name: 'offline2',
      location: 'default'
    }).then(() => {
      this.SQLitestorage.executeSql(`create table if not exists parameter(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name CHAR(40),
        value CHAR(100))`, {}).then(() => {　
        }, (err) => {
          console.error('Unable to execute sql: ', err);
        });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  private getValue(sName: string) {
    return this.SQLitestorage.executeSql("SELECT * FROM parameter WHERE name = ?", { sName }).then((resp) => {
      console.log('rc:'+resp.rows.length +'name:'+sName);
      if (resp.rows.length > 0) {
        for (var i = 0; i < resp.res.rows.length; i++) {
          let item = resp.res.rows.item(i);
          return item;
        }
      }
      else
      { 
        console.log('get'+false);
          return false;  
      }
    }).catch((error) => { 
       console.log(error);
    });
  }
  // some code here
  private setValue(sName: string, sValue: string) {
    let query = "INSERT OR REPLACE INTO parameter VALUES (?, ?, ?)";
    return this.SQLitestorage.executeSql(query, [ null, sName, sValue]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
            return true;
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
            return error.err;
        });
  }


  setData(sName: string, sValue: string)
  {
      let res;
      this.setValue(sName, sValue).then((data) => {
          console.log('SuccessS', data);   
          res = data;                            // lists all category, then we switch to
        }, (error) => {
          console.log('Error', error);
        });  
        return res; 
  }

  getData(sName: string)
  {
       let res;
       this.getValue('lang').then((data) => {
          console.log('Successg', data);   
          res = data;                            // lists all category, then we switch to
        }, (error) => {
          console.log('Error', error);
        }); 
          console.log('resssssssssssssssssss', res); 
        return res; 
  }
     

  // more code here
}