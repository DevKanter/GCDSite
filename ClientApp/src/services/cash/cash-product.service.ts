import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClientAuthorizeCallbackData, IOrderDetails } from 'ngx-paypal';
import { AccountCashComponent } from 'src/app/side-components/account/account-components/cash/cash.component';
import { CashProduct, CheckoutCancelRequest, GetCashAmountRequest, GetCashAmountResponse, GetCashProductListRequest, GetCashProductListResponse, Payer, PaypalCancelRequest, PaypalErrorRequest, PaypalTransactionApprovedRequest, PaypalTransactionApprovedResponse, PaypalTransactionAuthorizedRequest, PaypalTransactionAuthorizedResponse, PaypalTransactionStatus, StartCheckoutRequest, StartCheckoutResponse, StartPaypalTransactionRequest } from 'src/models/CashProduct';
import { AccountService } from '../account/account.service';
import { RequestService } from '../request/RequestService';

@Injectable({
  providedIn: 'root'
})
export class CashProductService {

  public accountCashComponent:AccountCashComponent;

  constructor(
    private _requestService: RequestService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar) { }

public GetCashAmount(){
  const request: GetCashAmountRequest = new GetCashAmountRequest(this.accountService.sessionID);

  
  this._requestService.sendPostRequest(request, "/Product/GetCashAmount").subscribe({
    next: (result:GetCashAmountResponse) => {
      this.accountCashComponent.cashAmount = result.cashBalance;
    },
    error: (error) => {
      console.log(error);
      this._snackBar.open("Failed to get CashAmount!", "", { duration: 3000 });

    }
  })
}

    public getCashProductList(){
      const request: GetCashProductListRequest = new GetCashProductListRequest(this.accountService.sessionID)

      this._requestService.sendPostRequest(request, "/Product/GetCashProductList").subscribe({
        next: (result:GetCashProductListResponse) => {
          this.accountCashComponent.cashProductList = result.cashProducts;
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Failed to get CashProducts!", "", { duration: 3000 });
  
        }
      })
    }
    public startCheckoutRequest(cashProduct:CashProduct){
      const request: StartCheckoutRequest = new StartCheckoutRequest(this.accountService.sessionID)
      request.CashProductId = cashProduct.id;
      this._requestService.sendPostRequest(request, "/Product/StartCheckout").subscribe({
        next: (result:StartCheckoutResponse) => {
          if(result.success){
            if(cashProduct.id === result.cashProduct.id){
              this.accountCashComponent.onCheckoutStartSuccess(result);
            }
            else{
              this._snackBar.open("Product ID missmatch!", "", { duration: 3000 });
            }
          }
          else{
            this._snackBar.open("Failed to start checkout!", "", { duration: 3000 });
            this.accountCashComponent.onTransactionFinish();
          }
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Failed to start checkout!", "", { duration: 3000 });
          this.accountCashComponent.onTransactionFinish();
        }
      })
    }
    public startPaypalTransaction(){
      const request:StartPaypalTransactionRequest = new StartPaypalTransactionRequest(this.accountService.sessionID)

      this._requestService.sendPostRequest(request, "/Product/StartPaypalTransaction").subscribe({
        next: (result:boolean) => {

        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Failed to start transaction!", "", { duration: 3000 });
          this.accountCashComponent.onTransactionFinish();
        }
      })
    }
    public onTransactionApproved(orderDetails:IOrderDetails){
      const request: PaypalTransactionApprovedRequest = new PaypalTransactionApprovedRequest(this.accountService.sessionID);
      request.Payer  = {
        Email:orderDetails.payer.email_address,
        FirstName:orderDetails.payer.name.given_name,
        LastName:orderDetails.payer.name.surname,
        PayerId:orderDetails.payer.payer_id
      };
      request.Status = (<any>PaypalTransactionStatus)[orderDetails.status];
      request.TransactionDate = new Date(orderDetails.create_time);
      request.TransactionId = orderDetails.id;
      request.PurchaseUnit=[{
        Price : Number.parseInt( orderDetails.purchase_units[0].amount.value.replace('.','')),
        Id: Number.parseInt(orderDetails.purchase_units[0].custom_id),
        Name:orderDetails.purchase_units[0].items[0].name
      }];
      
      this._requestService.sendNoCryptRequest(request, "/Product/OnPaypalTransactionApproved").subscribe({
        next: (result:PaypalTransactionApprovedResponse) => {
          this._snackBar.open("Transaction Approved!", "", { duration: 1000 });
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Transaction Approve Fail", "", { duration: 3000 });
          this.accountCashComponent.onTransactionFinish();
        }
      })

    }
    public onTransactionAuthorized(data:IClientAuthorizeCallbackData){
      const request: PaypalTransactionAuthorizedRequest = new PaypalTransactionAuthorizedRequest(this.accountService.sessionID);
      request.TransactionId = data.id;
      request.Status =(<any>PaypalTransactionStatus)[data.status];
      this._requestService.sendPostRequest(request, "/Product/OnPaypalTransactionAuthorized").subscribe({
        next: (result:PaypalTransactionAuthorizedResponse) => {
          if(result.success){
            this._snackBar.open("Transaction Authorized!", "", { duration: 1000 });
            this.accountCashComponent.onTransactionFinish();
          }
          else{
            this._snackBar.open("Transaction Authorize Fail", "", { duration: 3000 });
            this.accountCashComponent.onTransactionFinish();
          }

        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Transaction Authorize Fail", "", { duration: 3000 });
          this.accountCashComponent.onTransactionFinish();
  
        }
      })

    }
    public onManualCancel(){
      const request:CheckoutCancelRequest = new CheckoutCancelRequest(this.accountService.sessionID)
      this._requestService.sendPostRequest(request, "/Product/CancelCheckout").subscribe({
        next: (result:boolean) => {
          if(result){
            this._snackBar.open("Checkout canceled!", "", { duration:1000 });
          }

        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Could not cancel Checkout pls refresh page!", "", { duration: 3000 });
  
        }
      })
      //this.accountCashComponent.onTransactionFinish();
    }
    public onTransactionError(error:string){
      const request:PaypalErrorRequest = new PaypalErrorRequest(this.accountService.sessionID)
      request.Error = error;
      this._requestService.sendPostRequest(request, "/Product/PaypalErrorRequest").subscribe({
        next: (result:boolean) => {
          this._snackBar.open("Error send to Server!", "", { duration:1000 });
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("An Error ocurred sending the Error LOL!", "", { duration: 3000 });
  
        }
      })
      this.accountCashComponent.onTransactionFinish();
    }
    public onTransactionCancel(transactionId:string){
      const request:PaypalCancelRequest = new PaypalCancelRequest(this.accountService.sessionID)
      request.TransactionId = transactionId;
      this._requestService.sendPostRequest(request, "/Product/PaypalCancelRequest").subscribe({
        next: (result:boolean) => {
          this._snackBar.open("Transaction canceled!", "", { duration:1000 });
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open("Could not cancel Transaction pls refresh page!", "", { duration: 3000 });
  
        }
      })
      this.accountCashComponent.onTransactionFinish();
    }

}
