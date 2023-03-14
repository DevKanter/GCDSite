import { Component,Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IPayPalConfig, ICreateOrderRequest, IOrderDetails, IOnApproveCallbackData } from 'ngx-paypal';
import { CashProduct } from 'src/models/CashProduct';
import { CashProductService } from 'src/services/cash/cash-product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {cashProduct:CashProduct},private _cashService:CashProductService) { }

  ngOnInit() {
    this.initConfig();
  }
  private initConfig(): void {
    const price =(this.data.cashProduct.price/100).toString();
    const name = this.data.cashProduct.productName;
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'Aca89LkUVFiPCH3NA5bQJ1T_-o5V2H56lJ9MwvL0dNKirLKPJEpY5rJVBVM2vg-UfvlyVzhf9dibArwj',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: price,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: price
              }
            }
          },
          custom_id:this.data.cashProduct.id.toString(),
          items: [
            {
              name: name,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: price,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      //console.log('onApprove - transaction was approved, but not authorized', data, actions);
       actions.order.get().then((details: IOrderDetails) => {
        //console.log('onApprove - you can get full order details inside onApprove: ', details);
        this._cashService.onTransactionApproved(details);
      });
    },
    onClientAuthorization: (data) => {
      //console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this._cashService.onTransactionAuthorized(data);
    },
    onCancel: (data, actions) => {
      this._cashService.onTransactionCancel(data.orderID);
      //console.log('OnCancel', data, actions);
    },
    onError: err => {
      this._cashService.onTransactionError(err.toString())
      //console.log('OnError', err);
    },
    onClick: (data, actions) => {
      this._cashService.startPaypalTransaction()
    },
  };
  }

}
