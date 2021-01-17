import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String, 
    status: Boolean, 
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    } 
}, {
  toJSON: {
    virtuals: true
  }
})

// criando um campo virtual, que ao cadastrar nao aparece, mas ao fazer a busca sim. 
HouseSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
})

export default model('House', HouseSchema)