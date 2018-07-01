/**
 * LocationReport.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    type: {
      type: 'string',
      isIn: ['Roadblock', 'Landfall', 'Flood']
    },
    place: {
      type: 'string',
      required: true
    },
    lat: {
      type: 'number',
      required: true
    },
    lng: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    timestamp: {
      type: 'string',
      required: true
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    reportingUser: {
      model: 'user'
    },
    roadReport: {
      model: 'roadReport',
      via: 'locationReport'
    },
    business: {
      model: 'business',
      via: 'locationReport'
    },
    businessPremises: {
      model: 'businessPremises',
      via: 'locationReport'
    },
    gas: {
      model: 'gas',
      via: 'locationReport'
    }

  },

};

