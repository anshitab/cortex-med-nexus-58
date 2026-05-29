import { Schema, model, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  type: 'search' | 'filter' | 'productView' | 'chatOpen' | 'chatMessage';
  timestamp: number;
  term?: string;
  filterType?: 'category' | 'therapeuticArea';
  value?: string;
  productId?: string;
  productName?: string;
  message?: string;
}

const analyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    type:        { type: String, required: true },
    timestamp:   { type: Number, required: true },
    term:        String,
    filterType:  String,
    value:       String,
    productId:   String,
    productName: String,
    message:     String,
  },
  { timestamps: false }
);

export const AnalyticsEvent = model<IAnalyticsEvent>('AnalyticsEvent', analyticsEventSchema);
