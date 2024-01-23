import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { BaseResult } from 'src/utils/result/base-result';
import { CreateContactDto } from './dto/createContact.dto';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService : ContactService){}

    @Get()
    getContacts(): Promise<BaseResult>{
        return this.contactService.getAllContact();
    }

    @Post()
    createContact(@Body() createContactDto: CreateContactDto) : Promise<BaseResult> {
        return this.contactService.createContact(createContactDto);
    }

    @Delete(':id')
    deleteContacy(@Param('id') contactId: string) : Promise<BaseResult> {
        return this.contactService.deleteContactById(contactId);
    }
}
