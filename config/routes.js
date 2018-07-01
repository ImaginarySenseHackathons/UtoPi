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


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


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
  // REPORTS
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

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
