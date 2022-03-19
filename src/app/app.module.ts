import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import{FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalExpenseComponent } from './personal-expense/personal-expense.component';
import { PersonalExpenseModel } from './model/http-request/personal-expense-model';
import { DatePipe } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ManageCategoryFriendDataComponent } from './manage-category-friend-data/manage-category-friend-data.component';
import { LendBorrowExpenseComponent } from './lend-borrow-expense/lend-borrow-expense.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginRegisterPageComponent } from './user-login-register-page/user-login-register-page.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {SessionInterceptorService} from './service/session-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonalExpenseComponent,
    ManageCategoryFriendDataComponent,
    LendBorrowExpenseComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserHomePageComponent,
    PageNotFoundComponent,
    UserLoginRegisterPageComponent,
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe,{provide:HTTP_INTERCEPTORS,useClass:SessionInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
