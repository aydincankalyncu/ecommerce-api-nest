import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/schemas/contact.schema';
import { CreateContactDto } from './dto/createContact.dto';
import { BaseResult } from 'src/utils/result/base-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { ErrorResult } from 'src/utils/result/error-result';

@Injectable()
export class ContactService {
    constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>){}

    //Create contact info
    async createContact(createContactDto: CreateContactDto): Promise<BaseResult>{
        try {
            const newContact = new this.contactModel(createContactDto);
            const createdContact = await newContact.save();
            return new SuccessResult("Success", createdContact);
        } catch (error) {
            return new ErrorResult("Error occured on create contact", error);
        }
    }

    // List all contacts
    async getAllContact(): Promise<BaseResult>{
        try {
            const contactList = await this.contactModel.find().exec();
            return new SuccessResult("Success", contactList);
        } catch (error) {
            return new ErrorResult("Error occured on getting all contacts", error);
        }
    }

    //Delete contact by id
    async deleteContactById(contactId: string): Promise<BaseResult>{
        try {
            const deletedContact = await this.contactModel.findByIdAndDelete(contactId);
            return new SuccessResult("Success", deletedContact);
        } catch (error) {
            return new ErrorResult("Error occured on deleting contact", error);
        }
    }
}
