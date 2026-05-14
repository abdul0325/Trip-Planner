import { BaseEntityType } from "./base-entity.type";
import { MediaFileType } from "./mediafile-entity.type";

export type UserType =  BaseEntityType & {
  name: string;
  email: string;
  avatar: Avatar | null;
};

export type Avatar = MediaFileType