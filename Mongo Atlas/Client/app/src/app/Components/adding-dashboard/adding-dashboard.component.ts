import { Component, OnInit } from '@angular/core';
import { Article, Purchase } from 'src/app/Models/purchaseModel';
import { PurchasesService } from '../../Services/purchases.service';



@Component({
  selector: 'app-adding-dashboard',
  templateUrl: './adding-dashboard.component.html',
  styleUrls: ['./adding-dashboard.component.css']
})
export class AddingDashboardComponent implements OnInit {
  public errors : String = "";
  public purchase : Purchase = {
    clientCode : "",
    articles : []
  };

  public article : Article = {
    articleCode : "",
    unitPrice : 0,
    quantity : 0,
    tax : 0,
    profit : 0
  }


  constructor(
    private purchasesService : PurchasesService
  ) { 
  }

  ngOnInit(): void {
  }

  public submitArticle(){
    let temp : Article = JSON.parse(JSON.stringify(this.article));
    if (temp.tax != null) {
      temp.tax = temp.tax/100;
    }
    this.purchase.articles = this.purchase.articles?.concat(temp);
    this.resetArticle();
    
  }

  public deleteArticle(article : Article){
    this.purchase.articles?.forEach(element => {
      if(element.articleCode == article.articleCode){
        this.purchase.articles?.splice(this.purchase.articles.indexOf(element),1)
      }
      console.log(this.purchase.articles);
    });
  }

  public async onSubmit(): Promise<void> {
    this.purchasesService.addPurchase(this.purchase).subscribe(
      (response: any) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
        this.errors = err.error.message
      }
    );
    this.resetPurchase();
  }

  private resetArticle(){
    this.article.articleCode = "";
    this.article.unitPrice = 0;
    this.article.quantity = 0;
    this.article.profit = 0;
    this.article.tax = 0;
  }

  private resetPurchase(){
    this.purchase = {
      clientCode : "",
      articles : []
    };
  }

}
