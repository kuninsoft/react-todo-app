export default class ListItem {
    private static counter = 0;

    readonly id: number;
    title: string;
    isDone: boolean;

    isEdited = false;

    constructor(title: string, isDone: boolean = false) {
        this.title = title;
        this.isDone = isDone;

        this.id = ListItem.counter++;
    }
}