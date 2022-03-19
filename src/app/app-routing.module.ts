import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalExpenseComponent } from './personal-expense/personal-expense.component';
import { ManageCategoryFriendDataComponent } from './manage-category-friend-data/manage-category-friend-data.component';
import { LendBorrowExpenseComponent } from './lend-borrow-expense/lend-borrow-expense.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginRegisterPageComponent } from './user-login-register-page/user-login-register-page.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'/user-signin-signup/signin',pathMatch:'full'},
  {path:'user-signin-signup',redirectTo:'/user-signin-signup/signin',pathMatch:'full'},
  {path:'home',redirectTo:'/home/personalexpense',pathMatch:'full'},
  {
    path:'user-signin-signup',
    component:UserLoginRegisterPageComponent,
    children:
    [
      {path:'signin',component:UserLoginComponent},
      {path:'signup',component:UserRegisterComponent}
    ]
  },
  {
    path:'home',
    component:UserHomePageComponent,
    children:
    [
      {path:'personalexpense',component:PersonalExpenseComponent,canActivate:[AuthGuard]},
      {path:'lendborrowexpense',component:LendBorrowExpenseComponent,canActivate:[AuthGuard]},
      {path:'managecategoryandfrienddata',component:ManageCategoryFriendDataComponent,canActivate:[AuthGuard]},
      {path:'myaccount',component:UserAccountComponent,canActivate:[AuthGuard]}
    ]
  },
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
