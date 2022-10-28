import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { min, throwError } from 'rxjs';
import { CompanyService, Company, StockInput,StocksOutput } from '../company.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit 
{
  companies : Company[]=[];
  companyById: Company[]=[];
  companyCode: string='-1';
  startDate: Date = new Date();
  endDate: Date = new Date();
  stocks : StocksOutput[]=[];
  maxValue:number=0;
  minValue:number=0;
  avgValue:number=0;
  showTbl:boolean=false;
  message="";
  constructor(public restAPIService: CompanyService,private router: Router) 
  {}
  ngOnInit(): void {
    this.getAllCompany();
  }
  getAllCompany(): void {
    this.restAPIService.getAllCompany().subscribe((resp: any) => {
      var comp = resp;
      this.companies = comp;
    });
  }

  getCompanyById(companyCode :string ):void{
    this.restAPIService.getAllCompanyById(companyCode).subscribe((resp: any) => {
      var cmp = resp;
      this.companyById = Array.of(cmp);
    });  
  }
  
  fetchStocksData(stocksData:StockInput):void{
    this.message="";
    this.showTbl=false;
    if(stocksData.companyCode=="-1"){
        //alert("Please provide all details to add new company!");
        this.message = "Please provide valid inputs to fetch the data!";
        return;
    }
    this.restAPIService.getStockDetails(stocksData.companyCode,stocksData.startDate,stocksData.endDate).subscribe(
      {
        next:(resp) => {
        if(resp == null){
          this.message="No data present!";
          return;
        }
        else{          
          var data = resp;
          this.stocks = data;
          console.log(this.stocks);
          var stocksArray:number[]=[];
          var sum = 0;
          for(let i=0;i<this.stocks.length;i++){
            stocksArray.push(this.stocks[i].stockPrice);
            sum=sum+this.stocks[i].stockPrice;
          }
          console.log(stocksArray);
          //stocksArray.sort();
          var stocksArr = this.sortArray(stocksArray);
          console.log(stocksArr);
          this.minValue = stocksArr[0];
          this.maxValue = stocksArr[this.stocks.length-1];
          this.avgValue = sum/this.stocks.length;
          this.showTbl=true;
        }
      },
      error:(err : HttpErrorResponse) => {
        this.handleError(err);
        console.log(this.message);
        
      }}
    );  
  }

  sortArray(stocksArray:number[]):number[]{
    return stocksArray.sort(function(a,b){return a - b});
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.status == 500 || error.status == 400 || error.status == 404){
      this.message="Something went wrong! please try again later.";
    }
    else if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(()=>new Error('Something went wrong! please try again later.'));
  }

}
