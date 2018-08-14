export class Message {

    public icon: string = "";

    constructor(public title: string = "",
        public body: string = "",
        public tokens: string[] = [],
        public action: string = "") {
            this.icon = "https://firebasestorage.googleapis.com/v0/b/geocaching-16daa.appspot.com/o/icon.png?alt=media&token=b6fe45aa-4554-4bda-90e0-47a2267f789c";
        }

}