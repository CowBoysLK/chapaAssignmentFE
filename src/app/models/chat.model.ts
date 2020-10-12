export interface chat {
    id: number, 
    chatName : string
}

export interface ChatMessage {
    text: string ;
    user: number ;
    time: number;
    displayType: number; // 0 - sent by user , 1 - sent by other user 
}