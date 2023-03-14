import { AuthRequest } from "./Account";

export class CashProduct{
    public id:number;
    public amount:number;
    public price:number;
    public productName:string;
}

export class GetCashAmountRequest extends AuthRequest
{

}

export class GetCashAmountResponse
{
    public cashBalance:number
}

export class GetCashProductListRequest extends AuthRequest
{
}
export class GetCashProductListResponse
{
    public cashProducts:CashProduct[];
}

export class StartCheckoutRequest extends AuthRequest {
    public CashProductId:number;
}
export class StartCheckoutResponse
{
    public success:boolean
    public cashProduct:CashProduct
}

export class StartPaypalTransactionRequest extends AuthRequest
{

}
export class CheckoutCancelRequest extends AuthRequest
{

}
export class PaypalCancelRequest extends AuthRequest{
    TransactionId:string;
}

export class PaypalErrorRequest extends AuthRequest{
    Error:string;
}

export class PaypalTransactionApprovedRequest extends AuthRequest
{
    public TransactionDate:Date;
    public TransactionId:string;
    public Status:PaypalTransactionStatus;
    public Payer:Payer;
    public PurchaseUnit:PurchaseUnit[]
}

export class PaypalTransactionApprovedResponse
{
    public success:boolean;
}

export class PaypalTransactionAuthorizedRequest extends AuthRequest{
    public TransactionId:string;
    public Status:PaypalTransactionStatus;
}
export class PaypalTransactionAuthorizedResponse{
    public success:boolean;
}

export class Payer
{
    public Email:string;
    public FirstName:string;
    public LastName:string;
    public PayerId:string;
}

export class PurchaseUnit
{
    public Price:number;
    public Id:number;
    public Name:string;
}

export enum PaypalTransactionStatus
{
    APPROVED,
    SAVED,
    CREATED,
    VOIDED,
    COMPLETED
}
