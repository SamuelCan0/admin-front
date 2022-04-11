import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from '../models/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public url:string;
  public headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient) {
    this.url='https://mara-ac-server.herokuapp.com/api/';
  }

  getGallerys(): Observable<any>{
    return this.http.get(this.url+'gallerys',{headers:this.headers});
  }

  getGallery(id:String): Observable<any>{
    return this.http.get(this.url+'gallery/'+id,{headers:this.headers});
  }

  deleteGallery(id:String): Observable<any>{
    return this.http.delete(this.url+'deleteG/'+id,{headers:this.headers});
  }

  addGallery(gallery:Gallery){
    let params=JSON.stringify(gallery);
    return this.http.post(this.url+'saveG',params,{headers:this.headers});
  }

  updateGallery(gallery:Gallery){
    let params=JSON.stringify(gallery);
    let id=gallery._id;
    return this.http.put(this.url+'updateG/'+id,params,{headers:this.headers});
  }
}
