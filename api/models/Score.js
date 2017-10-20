/**
 * Score.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    artistId: {
      model: "Artist"
    },
    rank: {
      type: "string"
    },
    userId: {
      model: "User"
    }
  },
  tableName: 'Score'
};

