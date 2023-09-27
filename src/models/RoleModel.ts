import { model, Schema, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

// Define the role name enum
export enum RoleNameEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// Define the role status enum
export enum RoleStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

// Define the role permissions enum
export enum RolePermissionEnum {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPDATE = 'UPDATE',
}

export default interface Role {
  _id: Types.ObjectId;
  name: RoleNameEnum;
  description?: string;
  status: RoleStatusEnum;
  permissions: RolePermissionEnum[];
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleSchema = new Schema<Role>(
  {
    name: {
      type: Schema.Types.String,
      enum: Object.values(RoleNameEnum),
      default: RoleNameEnum.USER,
    },
    description: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 255,
    },
    status: {
      type: Schema.Types.String,
      enum: Object.values(RoleStatusEnum),
      default: RoleStatusEnum.ACTIVE,
    },
    permissions: {
      type: [Schema.Types.String],
      enum: Object.values(RolePermissionEnum),
      default: [RolePermissionEnum.VIEW],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

RoleSchema.index({ name: 1 });
RoleSchema.index({ status: 1 });
RoleSchema.index({ createdAt: 1 });
RoleSchema.index({ updatedAt: 1 });

export const RoleModel = model<Role>(
  DOCUMENT_NAME,
  RoleSchema,
  COLLECTION_NAME
);
