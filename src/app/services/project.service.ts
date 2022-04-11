import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url:string;
  public headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient) {
    this.url='https://mara-ac-server.herokuapp.com/api/';
  }

  getProjects(): Observable<any>{
    return this.http.get(this.url+'projects',{headers:this.headers});
  }

  getProject(id:String): Observable<any>{
    return this.http.get(this.url+'project/'+id,{headers:this.headers});
  }

  deleteProject(id:String): Observable<any>{
    return this.http.delete(this.url+'deleteP/'+id,{headers:this.headers});
  }

  addProject(project:Project){
    let params=JSON.stringify(project);
    return this.http.post(this.url+'saveP',params,{headers:this.headers});
  }

  updateProject(project:Project){
    let params=JSON.stringify(project);
    let id=project._id;
    return this.http.put(this.url+'updateP/'+id,params,{headers:this.headers});
  }

}
