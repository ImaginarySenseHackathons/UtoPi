/**
 * PersonReport.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    fUllName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name',
      maxLength: 120,
      example: 'Lisa'
    },
    lastApperance:{
      type: 'timestamp'
    },
    type:{
      type: 'string',
      isIn: ['break', 'through'],
      required: true
    },
    place:{
      type: 'string',
      required: true
    },
    lat:{
      type: 'number',
      required: true
    },
    lng:{
      type: 'number',
      required: true
    },
    description:{
      type: 'string',
      required: false
    },
    timestamp:{
      type: 'string',
      columnType: 'timestamp',
      required: true
    },
    state:{
      type: 'string',
      isIn: ['disappeared', 'dead', 'draft'],
      defaultsTo: 'draft'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

