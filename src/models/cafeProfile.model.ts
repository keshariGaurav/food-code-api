import { Document, Schema, model } from 'mongoose';

interface BankDetails {
    bankName: string;
    holderName: string;
    accountNumber: string;
    ifscCode: string;
}

interface CafeProfile extends Document {
    cafeName: string;
    ownerName: string;
    contactNumber: string;
    email: string;
    address: string;
    bankDetails: BankDetails;
}

const BankDetailsSchema = new Schema<BankDetails>({
    bankName: { type: String, required: true },
    holderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
});

const CafeProfileSchema = new Schema<CafeProfile>({
    cafeName: { type: String, required: true },
    ownerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    bankDetails: { type: BankDetailsSchema, required: true },
});

const CafeProfileModel = model<CafeProfile>('CafeProfile', CafeProfileSchema);

export default CafeProfileModel;
