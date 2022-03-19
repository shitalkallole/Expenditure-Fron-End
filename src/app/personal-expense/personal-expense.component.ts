import { Component, OnInit } from '@angular/core';
import { PersonalExpenseModel } from '../model/http-request/personal-expense-model';
import { ShareDataService} from '../service/share-data.service'
import { DatePipe } from '@angular/common';
import { PersonalExpenseApiCallService } from '../service/personal-expense-api-call.service';
import { CategoryApiCallService } from '../service/category-api-call.service';
import { BetweenDatesRequest } from '../model/http-request/between-dates-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.css']
})

export class PersonalExpenseComponent implements OnInit {

  public redirectUrl:String="/user-signin-signup/signin";

  //map contains mapping from Category Id to Category Name
  private categoryMap=new Map();
  private personalExpenseMap=new Map();
  
  
  //variables used for http request
  private personalExpenseModel=new PersonalExpenseModel();
  private betweenDatesRequestShowAndDelete=new BetweenDatesRequest();
  private betweenDatesRequestCalculate=new BetweenDatesRequest();
  

  //variables used for http response
  private updatedData;
  private categoryList;
  private personalExpenseList:any=[];
  private personalExpenseCalculateList:any=[];

  
  constructor(private shareData:ShareDataService,private personalExpenseApiCall:PersonalExpenseApiCallService,private categoryApiCall:CategoryApiCallService,private datePipe:DatePipe,private route:Router) { }

  ngOnInit() {
    //get all categories initially
    this.categoryApiCall.getCategories()
        .subscribe(data=>
          {
            this.categoryList=data;
            
            this.categoryList.forEach(element => {
            this.categoryMap.set(element.categoryId,element.categoryName);
            });    

          },
          error=>{
            //not required because this api is called on page load and when page loads by default session validation is done through auth guard
            
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{
              console.log(error.error);
            }
          });


    //set default values for form data
    this.personalExpenseModel.activityDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.personalExpenseModel.amount="0";
    this.personalExpenseModel.categoryId=null;
    this.personalExpenseModel.comment=null;
  }

  onCancelClick(){
    this.personalExpenseModel.activityDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.personalExpenseModel.amount="0";
    this.personalExpenseModel.categoryId=null;
    this.personalExpenseModel.comment=null;
  }
  
  onEntryClick(){
    /*if(check values are in correct format i.e date is todays or earlier in personalExpenseModel)
        {
          call api
          stay on same page and show successfully maked entry
        }
      else
        stay on same page and show errors
      */
    this.personalExpenseApiCall.createEntryInPersonalExpense(this.personalExpenseModel)
        .subscribe(
          data=>{console.log(data.successMessage)},
          error=>
          {
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else//may be 400 bad request
              console.log(error.error);
          }
          );
  }

  onShowPersonalExpenseBetweenDatesClick(){
    /*if(check start date<=endDate) 
      {
        call api and show data
      }
      else
        show error
    */
      this.personalExpenseApiCall.getAllPersonalExpensesBetweenDates(this.betweenDatesRequestShowAndDelete)
          .subscribe(data=>{
            this.personalExpenseMap.clear();
            this.personalExpenseList=data;
            
            this.personalExpenseList.forEach(element=>{
              this.personalExpenseMap.set(element.transactionId,1);
            });
          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else//may be 400 bad request
              console.log(error.error);
          });
  }

  onDeletePersonalExpenseBetweenDatesClick(){
    /*if(check start date<=endDate) 
      {
        call api and show data
      }
      else
        show error
    */
    this.personalExpenseApiCall.deleteAllPersonalExpenseBetweenDates(this.betweenDatesRequestShowAndDelete)
        .subscribe(data=>{
          this.personalExpenseList=[];
          this.personalExpenseMap.clear();

          console.log(data.successMessage);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else//may be 400 bad request
            console.log(error.error);
        });
  }

  onEditPersonalExpenseClick(transactionId,activityDate,categoryId,amount,comment){
      activityDate.disabled=false;
      categoryId.disabled=false;
      amount.disabled=false;
      comment.disabled=false;

      this.personalExpenseMap.set(transactionId,0);
  }

  onUpdatePersonalExpenseClick(transactionId,activityDate,categoryId,amount,comment,index){
      /*if(check values are in correct format i.e updated date is current or earlier,amount is entered etc)
          call api
      else
        show error and stay on same page
       */

      let personalExpenseUpdateModel=new PersonalExpenseModel();

      personalExpenseUpdateModel.activityDate=activityDate.value;
      personalExpenseUpdateModel.categoryId=categoryId.value;
      personalExpenseUpdateModel.amount=amount.value;
      personalExpenseUpdateModel.comment=comment.value;
    
      this.personalExpenseApiCall.updateEntryInPersonalExpense(transactionId,personalExpenseUpdateModel)
          .subscribe(data=>{
            this.updatedData=data;
            
            this.personalExpenseList[index].activityDate=this.datePipe.transform(this.updatedData.activityDate,'yyyy-MM-dd');
            this.personalExpenseList[index].category.categoryId=this.updatedData.category.categoryId;
            this.personalExpenseList[index].amount=this.updatedData.amount;
            this.personalExpenseList[index].comment=this.updatedData.comment;
          },
          error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }else{
            //if there is error then show previous data as it is
            activityDate.value=this.datePipe.transform(this.personalExpenseList[index].activityDate,'yyyy-MM-dd');
            categoryId.value=this.personalExpenseList[index].category.categoryId;
            amount.value=this.personalExpenseList[index].amount;
            comment.value=this.personalExpenseList[index].comment;
            
            //may be 400 bad request or 401 unauthorized
            console.log(error.status);
            console.log(error.error);
          }
          }
          );

      activityDate.disabled=true;
      categoryId.disabled=true;
      amount.disabled=true;
      comment.disabled=true;
    
      this.personalExpenseMap.set(transactionId,1);
    
  }
  onCancelPersonalExpenseClick(transactionId,activityDate,categoryId,amount,comment,index){
    activityDate.value=this.datePipe.transform(this.personalExpenseList[index].activityDate,'yyyy-MM-dd');
    categoryId.value=this.personalExpenseList[index].category.categoryId;
    amount.value=this.personalExpenseList[index].amount;
    comment.value=this.personalExpenseList[index].comment;

    activityDate.disabled=true;
    categoryId.disabled=true;
    amount.disabled=true;
    comment.disabled=true;

    this.personalExpenseMap.set(transactionId,1);
  }
  onDeletePersonalExpenseClick(transactionId,index){
    
    this.personalExpenseApiCall.deleteEntryFromPersonalExpense(transactionId)
        .subscribe(data=>{
          console.log(data.successMessage);
          this.personalExpenseList.splice(index,1);
          this.personalExpenseMap.delete(transactionId);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else//may be 400 bad request or 401 unauthorized
          {
            console.log(error.status);
            console.log(error.error);
          }
        });
  }
  onCalculatePersonalExpenseBetweenDatesClick(){
     /*if(check start date<=endDate) 
      {
        call api and show data
      }
      else
        show error
    */
    this.personalExpenseApiCall.calculatePersonalExpense(this.betweenDatesRequestCalculate)
        .subscribe(
          data=>{this.personalExpenseCalculateList=data},
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{ 
            console.log(error.status);
            console.log(error.error);
            }
          }    
          );
  }

}