export class Notification{
    id:number;
    text:string;
    recipientID:number;
    senderID: number;
    


    constructor(){
        this.id = -1;
        this.text = " ";
        this.recipientID = -1;
        this.senderID = -1;
    }
}

export class SendNotificationVM{
    text:string;
    recipientID:number;


    constructor(){
        this.text = " ";
        this.recipientID = -1;
    }
}
export class NotificationListItemVM{
    id:number;
    text:string;
    senderID: number;
    


    constructor(){
        this.id = -1;
        this.text = " ";
        this.senderID = -1;
    }

}