export interface Notification {
    message: string;
    pipicanId: string;
    pipicanName: string;
    senderId: string;
    timestamp: string;
    senderInfo: {
        ProfileImage: string | null;
        Username: string;
    };
}
  