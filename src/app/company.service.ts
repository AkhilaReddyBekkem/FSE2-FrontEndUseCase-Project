import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { environment } from 'src/environments/environment.prod';


//const endpoint = 'http://localhost:38855/';
//const endpoint = 'https://companyservice20221104170231.azurewebsites.net/api/v1.0/market/';
//const endpointStocks = 'http://localhost:19577/api/v1.0/market/Stock/';
//const endpointStocks = 'https://stockserviceresource.azurewebsites.net/api/v1.0/market/Stock/';
const endpointStocks = environment.backend.baseURLStocks;
const endpoint = environment.backend.baseURL;

export interface Company {
  companyCode: string;
  companyName: string;
  companyCEO: string;
  turnOver: Number;
  stockExchange : string;
}
export interface StockInput{
  companyCode: string;
  startDate:Date;
  endDate:Date;
}
export interface StocksOutput{
  date:Date;
  // time:Time;
  stockPrice:number;
}

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

  // constructor() { }
  constructor(private http: HttpClient) { }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getAllCompany(): Observable<any> {
    // return this.http.get<Company[]>(/apiUrl/ + 'api/v1.0/market/Company/getAll')
    // .pipe(catchError(this.handleError));
    // return this.http.get<Company[]>(endpoint + 'Company/getAll')
    // .pipe(catchError(this.handleError));
    return this.http.get<Company[]>(endpoint + '/Company/getAll')
    .pipe(catchError(this.handleError));
  }
  getAllCompanyById(companycode: string):Observable<any>{
    return this.http.get<Company[]>(endpoint + '/Company/info/' + companycode)
    .pipe(catchError(this.handleError));
    // return this.http.get<Company[]>(endpoint + 'Company/info/' + companycode)
    // .pipe(catchError(this.handleError));
  }

  addNewCompany(Company: Company): Observable<any> {
    return this.http.post(endpoint + '/Company/register/', Company);
    //Error handling done in typescript file.
  }
  // deleteCompany(companycode: string):Observable<any>{
  //   return this.http.delete(/api/ + 'Company/' + companycode).pipe(
  //     catchError(this.handleError));
  // }

  getStockDetails(companycode: string,startDate:Date, EndDate:Date):Observable<any>{
      //return this.http.get(/api/ + 'Stock/' + companycode + '/' + startDate + '/' + EndDate);  
      return this.http.get(endpointStocks + '/Stock/Get/' + companycode + '/' + startDate + '/' + EndDate); 
  }

  addStocks(stocksData: any): Observable<any> {
    // return this.http.post(/api/ + 'Stock', stocksData).pipe(
    //   catchError(this.handleError)
    // );
    return this.http.post(endpointStocks + '/Stock/add', stocksData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(()=>new Error('Something bad happened; please try again later.'));
  }
}
