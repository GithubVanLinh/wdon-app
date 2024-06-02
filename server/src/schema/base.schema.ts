import { Prop } from '@nestjs/mongoose';

export abstract class BaseSchema {
  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt: Date;
}
