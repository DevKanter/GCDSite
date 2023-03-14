import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { InfoComponent } from './center-components/home/info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideComponent} from './side-components/side.component'
import { RegisterComponent,CustomValidators } from './side-components/register/register.component'
import { LoginComponent } from './side-components/login/login.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewsComponent } from './center-components/news/news.component';
import { ThanksComponent } from './center-components/thanks/thanks.component';
import { PatchComponent } from './center-components/patch/patch.component';
import { EventComponent } from './center-components/event/event.component';
import { AccountComponent } from './side-components/account/account.component';
import { CookieService } from 'ngx-cookie-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { AccountCashComponent } from './side-components/account/account-components/cash/cash.component';
import { AccountCharacterListComponent } from './side-components/account/account-components/character-list/character-list.component';
import { AccountInfoComponent } from './side-components/account/account-components/info/info.component';
import { AccountSettingsComponent } from './side-components/account/account-components/settings/settings.component';
import { AuthGuard } from './../services/helper/auth/auth.guard';
import { PostComponent } from './center-components/post/post.component';
import { AddPostComponent } from './center-components/post/add-post/add-post.component';
import { EditPostComponent } from './center-components/post/edit-post/edit-post.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxPayPalModule } from 'ngx-paypal';
import { CheckoutComponent } from './side-components/account/account-components/cash/checkout/checkout.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PrivacyPolicyComponent } from './other/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './other/terms-of-service/terms-of-service.component';
import { CharacterEntryComponent } from './side-components/account/account-components/character-list/character-entry/character-entry.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { LandingPageComponent } from './other/landing-page/landing-page.component';
import { MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InfoComponent,
    LoginComponent,
    RegisterComponent,
    SideComponent,
    NewsComponent,
    ThanksComponent,
    PatchComponent,
    AccountComponent,
    AccountCashComponent,
    AccountCharacterListComponent,
    AccountInfoComponent,
    AccountSettingsComponent,
    PostComponent,
    AddPostComponent,
    EventComponent,
    CheckoutComponent,
    EditPostComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    CharacterEntryComponent,
    LandingPageComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: NewsComponent, pathMatch: 'full' },
      { path: 'patch', component: PatchComponent, pathMatch: 'full' },
      { path: 'info', component: InfoComponent, pathMatch: 'full' },
      { path: 'event', component: EventComponent, pathMatch: 'full' },
      { path: 'thanks', component: ThanksComponent, pathMatch: 'full' },
      { path: 'accountcash', component: AccountCashComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'accountcharacterlist', component: AccountCharacterListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'accountinfo', component: AccountInfoComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'accountsettings', component: AccountSettingsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'privacy', component: PrivacyPolicyComponent, pathMatch: 'full'},
      { path: 'terms', component: TermsOfServiceComponent, pathMatch: 'full'},
    ],{useHash:true}),
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatBottomSheetModule,
    NgxPayPalModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [CustomValidators, CookieService,AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
