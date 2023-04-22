import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { Author, AuthorUpdateVM } from "src/app/data/interfaces/Author";
import { HttpConfig } from "src/app/configs/HttpConfig";
import { PagedList } from "src/app/data/types/PagedList";

@Injectable({
    providedIn:'root',
})

export class AuthorService{

/**
 *
 */
constructor(private http: HttpClient) {}

 searchAuthors(
     filter: string): Observable<Author[]>{
         const url = `${HttpConfig.EndPoints.author.search}?filter=${filter}`;
         return this.http.get<Author[]>(url);
     }
 getAuthor(id: number): Observable<Author>{
     const url = `${HttpConfig.EndPoints.author.get}${id}`;
     return this.http.get<Author>(url);
 }
 updateAuthor(data : Author):Observable<Author>{
     
     return this.http.post<Author>(
         HttpConfig.EndPoints.author.update,data,
         HttpConfig.httpsOptions
     );
 }
 addAuthor(data : string): Observable<Author>{
     const url = `${HttpConfig.EndPoints.author.add}?name=${data}`
     return this.http.post<Author>(url,data,
        HttpConfig.httpsOptions);
 }

 deleteAuthor(data: Author): any{
     const url = `${HttpConfig.EndPoints.author.delete}${data.id}`;
     return this.http.delete<Author>(url);
    }
 
}