import { Component, OnInit } from '@angular/core';
import { FormArray,FormGroup,FormControl,Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService, Company } from '../company.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  
  companies : Company[]=[];
  companyById: Company[]=[];
  cmpnyCode: string='-1';
  companyCode: string='';
  companyName: string='';
  companyCEO: string='';
  turnOver: Number | undefined;
  stockExchange : string='-1';
  successMessage : string ="";
  errorMessage : string ="";
  infoMessage :string = "";
  constructor(public restAPIService: CompanyService,private router: Router) {}

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
    this.infoMessage="";
    if(companyCode == "-1"){
      //alert("Please select a company to display the data.");
      return;
    }
    else if(companyCode == "All"){
      this.restAPIService.getAllCompany().subscribe((resp: any) => {
        var cmp = resp;
        this.companyById = cmp;
      });
    }
    else{
      this.restAPIService.getAllCompanyById(companyCode).subscribe((resp: any) => {
        var cmp = resp;
        this.companyById = Array.of(cmp);
      });
    }

  }

  addCompany(companyData:Company):void
  {
    this.successMessage="";
    this.errorMessage="";
    if(companyData.companyCode=='' || companyData.companyName=='' || companyData.companyCEO==''|| companyData.turnOver==null
      || companyData.turnOver == 0 || companyData.stockExchange == '-1'){
        //alert("Please provide all details to add new company!");
        this.errorMessage = "Please provide all details to add new company!";
        return;
    }
    console.log(companyData);
    this.restAPIService.addNewCompany(companyData).subscribe({
      next:(resp) => {
        if(resp == null){
          this.successMessage = "Success! \"" + companyData.companyName + "\" company is added.";
        }
        else{
          this.successMessage=resp;
        }
        console.log(this.successMessage);
      },
      error:(err : HttpErrorResponse) => {
        this.handleError(err);
        console.log(this.errorMessage);
        
      }
    });
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.status == 500 || error.status == 400 || error.status == 404){
      this.errorMessage="Something went wrong! please try again later.";
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
