import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkAlive(): string {
    return 'Api is alive!';
  }
}
