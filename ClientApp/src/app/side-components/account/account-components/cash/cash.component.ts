import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../../services/account/account.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CashProduct, StartCheckoutResponse } from 'src/models/CashProduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashProductService } from 'src/services/cash/cash-product.service';
import { MatBottomSheet,MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-account-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./../../../../../styles.css','./cash.component.css']
})
export class AccountCashComponent implements OnInit  {

  public cashProductForm:FormGroup;
  public cashProductList:CashProduct[] =[];
  public selectedProduct:CashProduct;

  public cashAmount:number;

  private _bottomSheetRef: MatBottomSheetRef;
  constructor(private _cashService:CashProductService,private _bottomSheet: MatBottomSheet) {
    _cashService.accountCashComponent = this;
    this.cashProductForm = new FormGroup({
      cashProduct: new FormControl(CashProduct, [Validators.required])
    })
  }


  ngOnInit() {
    this._cashService.getCashProductList();
    this._cashService.GetCashAmount();
  }
  onCashProductSelect(product:CashProduct){
    this.selectedProduct = product;
  }
  onCheckoutStartRequest(){
    this._cashService.startCheckoutRequest(this.selectedProduct);
  }
  onCheckoutStartSuccess(response:StartCheckoutResponse){
    this._bottomSheetRef = this._bottomSheet.open(CheckoutComponent, {
      data: { cashProduct:response.cashProduct }
      });
    this._bottomSheetRef.afterDismissed().subscribe({
      next:()=>{
        this._cashService.onManualCancel();
        this._cashService.GetCashAmount();
      }
    })
  }
  onTransactionFinish(){
    this._bottomSheet.dismiss();
  }
}

