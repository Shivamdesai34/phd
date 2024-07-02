export class Fees_Receiptmaster {
    Receipt_ID!: number
    Finyear         !: number
    College_code    !: number
    Batch_code      !: number
    Aadhaar         !: number
    Term_code       !: number;
    Installment     !: number;
    Receiptno       !: number;
    Prefix_code     !: number;
    BilldeskID      !: number;
    BilldeskTranID  !: string;
    BilldeskDate    !: string;
    Payment_Mode    !: string;
    TransactionGUID !: string;
    ReceiptAmount   !: number;
    CreatedDate     !: string;
    Bank            !: string;
    Chequeno        !: string;
    Chequedate      !: string;
    CreatedBy       !: number;
    Narration       !: string;
    Transcationmode !: string;
    Printreceiptno  !: string;
}

export class Profilesubmited  {
    Profilesubmited! :boolean
    Submitedyear !  : number
}
