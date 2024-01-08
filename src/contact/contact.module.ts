import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from 'src/schemas/contact.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}])],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {}
