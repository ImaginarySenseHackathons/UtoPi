/**
 * LocationReportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getBlockedStreet: async (req, res) => {
    // VARIABLES
    let reports;
    // OPERATIONS
    try {
      reports = await LocationReport.find();
    } catch (err) {
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err);
      }
    }
    sails.log(reports);
    return res.ok(reports);
  },
  postBlockedStreet: async (req, res) => {
    // CONSTANTS
    const TYPE = 'Roadblock';
    // VARIABLES
    let body,
      report = [];
    // VALIDATE
    if (!req.param('user')) return res.badRequest('Please specify \'user\'');
    if (!req.param('status')) return res.badRequest('Please specify \'status\'');
    if (!req.param('place')) return res.badRequest('Please specify \'place\'');
    if (!req.param('lat')) return res.badRequest('Please specify \'lat\'');
    if (!req.param('lng')) return res.badRequest('Please specify \'lng\'');
    if (!req.param('timestamp')) return res.badRequest('Please specify \'timestamp\'');
    if (!req.param('description')) return res.badRequest('Please specify \'description\'');
    body = [
      {
        type: TYPE,
        timestamp: req.param('timestamp'),
        place: req.param('place'),
        lat: req.param('lat'),
        lng: req.param('lng'),
        user: req.param('user'),
        descripcion: req.param('descripcion')
      },
      {
        status: req.param('status')
      }];
    // ADD TO DATABASE
    // First table
    sails.log("Koko ni desuka ?");
    try {
      report[1] = await LocationReport.create(body[0]).fetch();
    } catch (err) {
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err, 'Failed to get report');
      }
    }
    sails.log("Are we there yet?");
    // Prepare data for second table
    body[1] = Object.assign( {}, body[1], {
      locationreport: report[1].id  // locationreport está en minúscula porque si no no sirve... Más misterios de Sails!
    });
    sails.log(body[1]);
    // Second table
    try {
      report[2] = await RoadReport.create(body[1]).fetch();
    } catch (err) {
      sails.log("Koko ni mo desuka ?");
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err);
      }
    }
    sails.log("Koko ni mo desuka 3 ?");
    // PREPARE OUTPUT
    report[0] = Object.assign( {}, report[1], report[2] );
    // SEND RESPONSE
    return res.ok(report[0]);
  }
};
