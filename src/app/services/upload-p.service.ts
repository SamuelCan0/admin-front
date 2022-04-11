import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPService {

  constructor(private http: HttpClient) {
  }

  uploadImage(valores:any): Observable<any>{
    let data=valores;
    return this.http.post('https://api.cloudinary.com/v1_1/dgh2km6fr/image/upload',data);
  }
}
