export class BaseResult {
    constructor(public hasError: boolean, public message: string, public data: any){}
  }