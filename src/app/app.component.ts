import { Component } from '@angular/core';
import {CompanyComponent} from './company/company.component';
import {StockComponent} from './stock/stock.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EStockApp';
}
