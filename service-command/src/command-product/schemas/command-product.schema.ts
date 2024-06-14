import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Command } from '../../command/schemas/command.schema';

@Schema()
export class CommandProduct extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Command' })
  command: Command;

  @Prop()
  productId: number;

  @Prop()
  productName: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

export const CommandProductSchema = SchemaFactory.createForClass(CommandProduct);
