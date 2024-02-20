import { Injectable } from '@angular/core';
import { Person } from './persone.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class PersonService{


    constructor(
        private http : HttpClient
      ){}
    
    
    getAllPersons(): Observable<Person[]>{
        console.log("refresh person's list")
        return this.http.get<Person[]>("http://localhost:2023/api/persons/list");
    }

    addPersone(person: Person): void{
        const data = { ...person};
        this.http.post("http://localhost:2023/api/persons/save", data).subscribe(res => console.log("save sub :",res));
    }
}