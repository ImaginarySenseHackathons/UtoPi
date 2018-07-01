/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // USER Related
  'GET /users/': {
    controller: 'user',
    action: 'find'
  },
  'GET /user/:id': {
    controller: 'user',
    action: 'findOne'
  },
  'POST /user/': {
    controller: 'user',
    action: 'post'
  },

  // POST REPORTS
  // Location Based
  'POST /report/blockedstreet': {
    controller: 'locationReport',
    action: 'postBlockedStreet'
  },
  'POST /report/landfall': {
    controller: 'locationReport',
    action: 'postLandFall'
  },
  'POST /report/flood': {
    controller: 'locationReport',
    action: 'postFlood'
  },

  // Location based, business related
  'POST /report/restaurant': {
    controller: 'locationReport',
    action: 'postRestaurant'
  },
  'POST /report/collectioncenter': {
    controller: 'locationReport',
    action: 'postCollectionceter'
  },
  'POST /report/oasis': {
    controller: 'locationReport',
    action: 'postOasis'
  },
  'POST /report/gas': {
    controller: 'locationReport',
    action: 'postGas'
  },
  'POST /report/powerspots': {
    controller: 'locationReport',
    action: 'postSpots'
  },
  'POST /report/energy': {
    controller: 'locationReport',
    action: 'postEnergy'
  },

  // Location based, health related
  'POST /report/pharmacy': {
    controller: 'locationReport',
    action: 'postPharmacy'
  },
  'POST /report/doctorsOffice': {
    controller: 'locationReport',
    action: 'postDoctorsOffice'
  },
  'POST /report/vet': {
    controller: 'locationReport',
    action: 'postVet'
  },

  // Trash related
  'POST /report/trash': {
    controller: 'locationReport',
    action: 'postTrash'
  },
  'POST /report/recyclingcenter': {
    controller: 'locationReport',
    action: 'postRecyclingCenter'
  },

  // GET REPORTS
  // Location Based
  'GET /report/blockedstreet': {
    controller: 'locationReport',
    action: 'getBlockedStreet'
  },
  'GET /report/landfall': {
    controller: 'locationReport',
    action: 'getLandFall'
  },
  'GET /report/flood': {
    controller: 'locationReport',
    action: 'getFlood'
  },

  // Location based, business related
  'GET /report/restaurant': {
    controller: 'locationReport',
    action: 'getRestaurant'
  },
  'GET /report/collectioncenter': {
    controller: 'locationReport',
    action: 'getCollectionceter'
  },
  'GET /report/oasis': {
    controller: 'locationReport',
    action: 'getOasis'
  },
  'GET /report/gas': {
    controller: 'locationReport',
    action: 'getGas'
  },
  'GET /report/powerspots': {
    controller: 'locationReport',
    action: 'getSpots'
  },
  'GET /report/energy': {
    controller: 'locationReport',
    action: 'getEnergy'
  },

  // Location based, health related
  'GET /report/pharmacy': {
    controller: 'locationReport',
    action: 'postPharmacy'
  },
  'GET /report/doctorsOffice': {
    controller: 'locationReport',
    action: 'postDoctorsOffice'
  },
  'GET /report/vet': {
    controller: 'locationReport',
    action: 'postVet'
  },

  // Trash related
  'GET /report/trash': {
    controller: 'locationReport',
    action: 'getTrash'
  },
  'GET /report/recyclingcenter': {
    controller: 'locationReport',
    action: 'getRecyclingCenter'
  },

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
