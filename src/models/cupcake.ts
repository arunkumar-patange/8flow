/*
 *
 *
 *
 */
import { mongoose, AutoIncrement } from '../services/dao';

const cupcakeSchema = new mongoose.Schema({
  id: { type: Number, unique: true, immutable: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: Object,
  description: String
}, { timestamps: true });

cupcakeSchema.plugin(AutoIncrement, { inc_field: 'id' });

const CupCake = mongoose.model('CupCake', cupcakeSchema);
export default CupCake;
