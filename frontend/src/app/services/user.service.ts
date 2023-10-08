import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const endPoint = "http://localhost:8080/users";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get(endPoint);
  }

  post(userName: any,userPassword: any,userEmail: any){
    let body = new URLSearchParams();
    body.append("name",userName);
    body.append("password",userPassword);
    body.append("email",userEmail);
    return this.httpClient.post(endPoint,body,httpOptions);
  }

  put(idUser: any,userName: any,userPassword: any,userEmail: any){
    let body = new URLSearchParams();
    body.append("idUser",idUser);
    body.append("name",userName);
    body.append("password",userPassword);
    body.append("email",userEmail);
    return this.httpClient.put(endPoint+"/"+idUser,body,httpOptions)
  }
}
