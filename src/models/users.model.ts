import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        // Never leak the password hash through an API response
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
