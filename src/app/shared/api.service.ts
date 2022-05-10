import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  //post method
  postRestaurant(data:any){
     return this._http.post<any>("http://localhost:3000/restaurants",data).pipe(map((res:any)=>{
      return res;
     }))
    }

    //get method
    getRestaurant(){
      return this._http.get<any>("http://localhost:3000/restaurants").pipe(map((res:any)=>{
       return res;
      }))
     }

     //update method
    updateRestaurant(data:any,id:number){
      return this._http.put<any>("http://localhost:3000/restaurants/"+id,data).pipe(map((res:any)=>{
       return res;
      }))
     }
     deleteRestaurant(id:number){
      return this._http.delete<any>("http://localhost:3000/restaurants/"+id).pipe(map((res:any)=>{
       return res;
      }))
     }


  }
   


