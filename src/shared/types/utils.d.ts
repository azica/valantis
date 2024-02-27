import type NotificationEnum from "./enums";
declare global {
  type ResponseSuccess = {
    status: string;
    message: string;
  };

  type ErrorResponse = {
    status: number;
    message: string;
  };

  type RefetchFunction = () => Promise<void>;

  type ObjectType = { id: number; key: string; value: string };
}
