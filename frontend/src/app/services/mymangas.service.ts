import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

const endPoint = "http://localhost:8080/mangas";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MymangasServiceService {

  constructor(private httpClient: HttpClient) { }

  getAll(userId: number){
    return this.httpClient.get(endPoint+"/users/"+userId);
  }

  post(mangaName: any,mangaSynopsis: any,mangaChapter: any,userId: number){
    let body = new URLSearchParams();
    body.append("name",mangaName);
    body.append("synopsis",mangaSynopsis);
    body.append("chapter",mangaChapter);
    return this.httpClient.post(endPoint+"/users/"+userId,body,httpOptions);
  }

  delete(idManga: any,userId: number){
    return this.httpClient.delete(endPoint+"/"+idManga+"/users/"+userId,httpOptions);
  }

  put(userId: number,idManga: any,mangaName: any,mangaSynopsis: any,mangaChapter: any){
    let body = new URLSearchParams();
    body.append("idManga",idManga);
    body.append("name",mangaName);
    body.append("synopsis",mangaSynopsis);
    body.append("chapter",mangaChapter);
    return this.httpClient.put(endPoint+"/"+idManga+"/users/"+userId,body,httpOptions)
  }
}
