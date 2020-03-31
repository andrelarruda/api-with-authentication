const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// função do mongoose que permite efetuar operações antes de salvar a instancia no BD
//o "this" nessa função se refere ao model em questão (User)
// UserSchema.pre('save', async function(next) {
//    const hash = await bcrypt.hash(this.password, 10);
//    this.password = hash;

//    next();
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;