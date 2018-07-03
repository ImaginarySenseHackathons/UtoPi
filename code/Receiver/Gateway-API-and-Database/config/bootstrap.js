/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  // USER
  if (await User.count() > 0) {
    await User.createEach([
      { email: 'admin@imaginary.tech', name: 'Imaginary', lastName: 'Sense' },
    ]);

    // LOCATION REPORT
    await LocationReport.createEach([
      {
        user:1,
        status: 'Blocked',
        lat:-66.23463,
        lng:18.37246,
        timestamp:1505498400,
        description:'Arbol bloquea carril, frente a CESCO.',
        place:'CESCO Bayamón'
      },
      {
        user:1,
        status: 'Blocked',
        lat:-66.1429564,
        lng:18.74651,
        timestamp:1505498400,
        description:'Postes caídos impiden paso a Carr Los Benites',
        place:'Carretera Benites, Bayamón'
      }
    ]);
    // 1505892882
    // 1505929728
    await RoadReport.createEach([
      {
        status: 'Blocked',
        locationreport:1,
      },
      {
        status: 'Blocked',
        locationreport:2
      }
    ]);
  }
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
