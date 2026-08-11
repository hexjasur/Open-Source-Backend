const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password_hash: {
      type: String,
      required: true,
    },

    refresh_token_hash: {
      type: String,
      default: null,
      select: false,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },

    role: {
      type: String,
      enum: ['owner', 'admin'],
      required: true,
    },

    avatar_url: {
      type: String,
      default: null,
    },

    thumbnail_url: {
      type: String,
      default: null,
    },

    display_name: {
      type: String,
      default: null,
    },

    is_private: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'users',
    versionKey: false,
  },
);

module.exports = mongoose.model('User', UserSchema);
