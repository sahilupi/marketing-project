import { User } from "./user.model";

export class Order {
  constructor(
    public _id: string,
    public razorPayOrderId: string,
    public orderDetails: {
      paymentStatus: string,
      payableTotal: number,
      planPrice: number,
      youtubeLink: string,
      targetAndWants: string[],
      gender: string,
      age: string,
      location: string,
      country: string,
      currency: string,
      videoCategory: string,
      keywords: string,
      budget: number,
      views: number
    },
    public user: User
  ) { }
}
