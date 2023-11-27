import { BaseResult } from "./base-result";

export class SuccessResult extends BaseResult{
  constructor(message: string, data: any){
    super(false, message, data);
  }
}