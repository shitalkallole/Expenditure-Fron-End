import { Component, OnInit } from '@angular/core';
import { LendBorrowExpenseRequest } from '../model/http-request/lend-borrow-expense-request';
import { CategoryApiCallService } from '../service/category-api-call.service';
import { ShareDataService } from '../service/share-data.service';
import { FriendApiCallService } from '../service/friend-api-call.service';
import { LendBorrowExpenseApiCallService } from '../service/lend-borrow-expense-api-call.service';
import { DatePipe } from '@angular/common';
import { BetweenDatesRequestForLendBorrow } from '../model/http-request/between-dates-request-for-lend-borrow';
import { BetweenDatesRequestForCategory } from '../model/http-request/between-dates-request-for-category';
import { LendExpenseForCategoryResponse } from '../model/http-response/lend-expense-for-category-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lend-borrow-expense',
  templateUrl: './lend-borrow-expense.component.html',
  styleUrls: ['./lend-borrow-expense.component.css']
})
export class LendBorrowExpenseComponent implements OnInit {

  public redirectUrl:String="/user-signin-signup/signin";

  //map contains mapping from Category Id to Category Name
  private categoryMap=new Map();
  private friendMap=new Map();
  private lendBorrowExpenseMap=new Map();

  //variables used for http request
  public lendBorrowExpenseRequest=new LendBorrowExpenseRequest();
  public betweenDatesRequestForLendBorrowShowAndDelete=new BetweenDatesRequestForLendBorrow();
  public betweenDatesRequestForLendBorrowCalculate=new BetweenDatesRequestForLendBorrow();
  public betweenDatesRequestForLendCategory=new BetweenDatesRequestForCategory();

  //variables used for http response
  private categoryList;
  private friendList;
  private lendBorrowExpenseList:any=[];
  private updatedData;
  private lendBorrowExpenseCalculateList=[];
  private lendExpenseForCategoryList=[];
  private finalAmountOflendExpenseForCategory=0;

  constructor(private shareData:ShareDataService,private categoryApiCall:CategoryApiCallService,private friendApiCall:FriendApiCallService,private lendBorrowExpenseApiCall:LendBorrowExpenseApiCallService,private datePipe:DatePipe,private route:Router) { }

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

    //get all friends initially
    this.friendApiCall.getFriends()
        .subscribe(data=>{
            this.friendList=data;

            this.friendList.forEach(element => {
            this.friendMap.set(element.friendId,element.friendName);
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
        
    //set default values for lendBorrowExpenseRequest
    this.lendBorrowExpenseRequest.activityDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.lendBorrowExpenseRequest.categoryId=null;
    this.lendBorrowExpenseRequest.amount="0";
    this.lendBorrowExpenseRequest.comment=null;
    this.lendBorrowExpenseRequest.friendId=null;
    this.lendBorrowExpenseRequest.lendOrBorrow=null;

    //set dafault values for show_and_delete_between_dates(betweenDatesRequestForLendBorrowShowAndDelete)
    this.betweenDatesRequestForLendBorrowShowAndDelete.friendId="0";

    //set default values for calculate_between_dates(betweenDatesRequestForLendBorrowCalculate)
    this.betweenDatesRequestForLendBorrowCalculate.friendId="0";
  }

  onCancelClick(){
    this.lendBorrowExpenseRequest.activityDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.lendBorrowExpenseRequest.categoryId=null;
    this.lendBorrowExpenseRequest.amount="0";
    this.lendBorrowExpenseRequest.comment=null;
    this.lendBorrowExpenseRequest.friendId=null;
    this.lendBorrowExpenseRequest.lendOrBorrow=null;
  }

  onEntryClick(){
    //do the validation that all fields selected(like activity date,category,amount,friend,lend or borrow)
    this.lendBorrowExpenseApiCall.createEntryInLendBorrowExpense(this.lendBorrowExpenseRequest)
        .subscribe(data=>{
          console.log(data.successMessage);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//bad request
          console.log(error.status);
          console.log(error.error);
        }
        });
  }

  onShowLendBorrowExpenseBetweenDatesClick(){
    if(this.betweenDatesRequestForLendBorrowShowAndDelete.friendId=="0")
    {
      this.lendBorrowExpenseApiCall.getAllLendBorrowExpensesBetweenDates(this.betweenDatesRequestForLendBorrowShowAndDelete)
          .subscribe(data=>{
            this.lendBorrowExpenseMap.clear();
            this.lendBorrowExpenseList=data;

            this.lendBorrowExpenseList.forEach(element => {
              this.lendBorrowExpenseMap.set(element.transactionId,1);
            });

          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//bad request
              console.log(error.error);
              console.log(error.status);
            }
          });
    }
    else
    {
      this.lendBorrowExpenseApiCall.getAllLendBorrowExpensesOfFriendBetweenDates(this.betweenDatesRequestForLendBorrowShowAndDelete)
          .subscribe(data=>{
            this.lendBorrowExpenseMap.clear();
            this.lendBorrowExpenseList=data;

            this.lendBorrowExpenseList.forEach(element => {
              this.lendBorrowExpenseMap.set(element.transactionId,1);
            });

          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//may be bad request or unauthorized
              console.log(error.status);
              console.log(error.error);
            }
          })
    }
    
  }

  onDeleteLendBorrowExpenseBetweenDatesClick(){
    if(this.betweenDatesRequestForLendBorrowShowAndDelete.friendId=="0"){
      this.lendBorrowExpenseApiCall.deleteAllLendBorrowExpensesBetweenDates(this.betweenDatesRequestForLendBorrowShowAndDelete)
          .subscribe(data=>{
            this.lendBorrowExpenseList=[];
            this.lendBorrowExpenseMap.clear();
            
            console.log(data.successMessage);
          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//bad request
              console.log(error.status);
              console.log(error.error);
            }
          });    
    }
    else
    {
      this.lendBorrowExpenseApiCall.deleteAllLendBorrowExpensesOfFriendBetweenDates(this.betweenDatesRequestForLendBorrowShowAndDelete)
          .subscribe(data=>{
            this.lendBorrowExpenseList=[];
            this.lendBorrowExpenseMap.clear();

            console.log(data.successMessage);
          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//may be bad request or unauthorized
              console.log(error.status);
              console.log(error.error); 
            }
          });
    }
  }

  onEditLendBorrowExpenseClick(transactionId,activityDate,categoryId,amount,comment,friendId,lendOrBorrow){

    activityDate.disabled=false;
    categoryId.disabled=false;
    amount.disabled=false;
    comment.disabled=false;
    friendId.disabled=false;
    lendOrBorrow.disabled=false;

    this.lendBorrowExpenseMap.set(transactionId,0);
  }
  onDeleteLendBorrowExpenseClick(transactionId,index){
    this.lendBorrowExpenseApiCall.deleteEntryFromLendBorrowExpense(transactionId)
        .subscribe(data=>{
          this.lendBorrowExpenseList.splice(index,1);
          this.lendBorrowExpenseMap.delete(transactionId);

          console.log(data.successMessage);
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request or unauthorized
            console.log(error.status);
            console.log(error.error); 
          }
        });
  }
  onUpdateLendBorrowExpenseClick(transactionId,activityDate,categoryId,amount,comment,friendId,lendOrBorrow,index){
    let lendBorrowExpenseUpdateRequest=new LendBorrowExpenseRequest();

    lendBorrowExpenseUpdateRequest.activityDate=activityDate.value;
    lendBorrowExpenseUpdateRequest.categoryId=categoryId.value;
    lendBorrowExpenseUpdateRequest.amount=amount.value;
    lendBorrowExpenseUpdateRequest.comment=comment.value;
    lendBorrowExpenseUpdateRequest.friendId=friendId.value;
    lendBorrowExpenseUpdateRequest.lendOrBorrow=lendOrBorrow.value;

    this.lendBorrowExpenseApiCall.updateEntryInLendBorrowExpense(transactionId,lendBorrowExpenseUpdateRequest)
        .subscribe(data=>{
            this.updatedData=data;

            this.lendBorrowExpenseList[index].activityDate=this.datePipe.transform(this.updatedData.activityDate,'yyyy-MM-dd');
            this.lendBorrowExpenseList[index].category.categoryId=this.updatedData.category.categoryId;
            this.lendBorrowExpenseList[index].amount=this.updatedData.amount;
            this.lendBorrowExpenseList[index].comment=this.updatedData.comment;
            this.lendBorrowExpenseList[index].friend.friendId=this.updatedData.friend.friendId;
            this.lendBorrowExpenseList[index].lendOrBorrow=this.updatedData.lendOrBorrow;
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{
            //if there is error need to show previous data as it is
          activityDate.value = this.datePipe.transform(this.lendBorrowExpenseList[index].activityDate,'yyyy-MM-dd');
          categoryId.value=this.lendBorrowExpenseList[index].category.categoryId;
          amount.value=this.lendBorrowExpenseList[index].amount;
          comment.value=this.lendBorrowExpenseList[index].comment;
          friendId.value=this.lendBorrowExpenseList[index].friend.friendId;
          lendOrBorrow.value=this.lendBorrowExpenseList[index].lendOrBorrow;
            
          //may be bad request or unauthorized

          console.log(error.error);
          console.log(error.status);
          }
        });

    activityDate.disabled=true;
    categoryId.disabled=true;
    amount.disabled=true;
    comment.disabled=true;
    friendId.disabled=true;
    lendOrBorrow.disabled=true;

    this.lendBorrowExpenseMap.set(transactionId,1);
      
  }
  onCancelLendBorrowExpenseClick(transactionId,activityDate,categoryId,amount,comment,friendId,lendOrBorrow,index){
    activityDate.value = this.datePipe.transform(this.lendBorrowExpenseList[index].activityDate,'yyyy-MM-dd');
    categoryId.value=this.lendBorrowExpenseList[index].category.categoryId;
    amount.value=this.lendBorrowExpenseList[index].amount;
    comment.value=this.lendBorrowExpenseList[index].comment;
    friendId.value=this.lendBorrowExpenseList[index].friend.friendId;
    lendOrBorrow.value=this.lendBorrowExpenseList[index].lendOrBorrow;
    
    activityDate.disabled=true;
    categoryId.disabled=true;
    amount.disabled=true;
    comment.disabled=true;
    friendId.disabled=true;
    lendOrBorrow.disabled=true;

    this.lendBorrowExpenseMap.set(transactionId,1);
  }

  //Calculation start
  onCalculateLendBorrowExpenseBetweenDatesClick(){
    if(this.betweenDatesRequestForLendBorrowCalculate.friendId=="0"){
      this.lendBorrowExpenseApiCall.calculateLendBorrowExpenseForEachFriend(this.betweenDatesRequestForLendBorrowCalculate)
          .subscribe(data=>{
            this.lendBorrowExpenseCalculateList=[];

            this.updatedData=data;
            this.updatedData.forEach(element => {
              this.lendBorrowExpenseCalculateList.push(element);
            });
          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//may be bad request
              console.log(error.error); 
            }
            
          });
    }
    else{
      this.lendBorrowExpenseApiCall.calculateLendBorrowExpenseForSingleFriend(this.betweenDatesRequestForLendBorrowCalculate)
          .subscribe(data=>{
            this.lendBorrowExpenseCalculateList=[];

            this.lendBorrowExpenseCalculateList.push(data);
          },
          error=>{
            if(error.status==403){//forbidden
              this.route.navigate([this.redirectUrl]);
              console.log("session expired pls login");
            }
            else{//may be bad request or unauthorized
              console.log(error.error); 
            }
          });
    }
  }

  //Show Lend expense on category by date wise start
  onShowLendExpenseForCategoryClick(){
    this.lendBorrowExpenseApiCall.calculateLendExpenseForCategory(this.betweenDatesRequestForLendCategory)
        .subscribe(data=>{
          let finalAmount=0;
          this.lendExpenseForCategoryList=[];//we are pushing data in this array so we need to first clear it (the data present from last call) before proceeding.

          this.updatedData=data;
          this.updatedData.forEach(element => {
            let lendExpenseForCategoryResponse=new LendExpenseForCategoryResponse();

            lendExpenseForCategoryResponse.date=element.date;
            lendExpenseForCategoryResponse.friendMap=new Map();
            Object.keys(element.friendMap).forEach(key=>{
              lendExpenseForCategoryResponse.friendMap.set(key,element.friendMap[key]);   
            });
            lendExpenseForCategoryResponse.totalAmount=element.totalAmount;
            finalAmount=finalAmount+element.totalAmount;

            this.lendExpenseForCategoryList.push(lendExpenseForCategoryResponse);
          });

          this.finalAmountOflendExpenseForCategory=finalAmount;
        },
        error=>{
          if(error.status==403){//forbidden
            this.route.navigate([this.redirectUrl]);
            console.log("session expired pls login");
          }
          else{//may be bad request or unauthorized
            console.log(error.error);
          }
        }); 
  } 
  
}
