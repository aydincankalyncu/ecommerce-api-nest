import { BaseResult } from "./base-result";

export class ErrorResult extends BaseResult{
  constructor(message: string, data: any){
    super(true, message, data);
  }
}