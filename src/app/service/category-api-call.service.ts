import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface createCategoryResponse{
  categoryId:any;
  categoryName:String;
}

interface successMessageResponse{
  successMessage:String;
}


@Injectable({
  providedIn: 'root'
})
export class CategoryApiCallService {

  private baseUrl="http://localhost:8082/category";

  constructor(private http:HttpClient) { }

  public createCategory(categoryRequest){
    return this.http.post<createCategoryResponse>(this.baseUrl,categoryRequest);
  }

  public getCategories(){
    return this.http.get(this.baseUrl);
  }

  public updateCategory(categoryId,categoryRequest){
    return this.http.put(this.baseUrl+"/"+categoryId,categoryRequest);
  }

  public deleteCategory(categoryId){
    return this.http.delete<successMessageResponse>(this.baseUrl+"/"+categoryId);
  }
}
