import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommandProduct, CommandProductSchema } from '../../command-product/schemas/command-product.schema';

@Schema({ timestamps: { createdAt: 'creation_command_date', updatedAt: 'delivery_date' } })
export class Command extends Document {
  @Prop()
  user: string;

  @Prop()
  status: number;

  @Prop([{ type: CommandProductSchema }])
  commandProduct: CommandProduct[];
}

export const CommandSchema = SchemaFactory.createForClass(Command);
