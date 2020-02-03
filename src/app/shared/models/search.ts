export const FIRST_PAGE = 0;
export const INIT_PAGE_SIZE = 1 

export class Page {
    page = FIRST_PAGE;
    pageSize = INIT_PAGE_SIZE;
    totalResults: number = 0;
}

export class Search<T> {
    eq: T;
    like: T;
    ge: T;
    le: T;

    order: string;

    page: Page;

    constructor(TCreator: new() => T) {
        this.eq = new TCreator();
        this.like = new TCreator();
        this.ge = new TCreator();
        this.le = new TCreator();
        this.page = new Page();
    }
}

