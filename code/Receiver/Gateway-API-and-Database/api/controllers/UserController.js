/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // GET /user
  // Look for a user info with an id in the database.
  find: async function (req, res) {
    // VARS
    let users;
    // OPERATIONS
    try {
      users = await User.find();
    } catch (err) {
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err);
      }
    }
    return res.ok();
  },
  // GET /user/:id
  // Look for a user info with an id in the database.
  findOne: async function (req, res) {
    // VALIDATE
    try {
      user = await User.findOne(userId);
    } catch (err) {
      // If unknown error.
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err);
      }
    }
    if (!user)
      return res.notFound('User with id \'' + userId + '\' has not been found');
    return res.ok(user);
  },
  // POST /user
  // Create a new user in the database
  create: async function (req, res) {
    // VARIABLES
    let body,
      user;
    // VALIDATE
    if (!req.param('email')) return res.badRequest('Please specify \'email\'');
    if (!req.param('firstName')) return res.badRequest('Please specify \'firstName\'');
    if (!req.param('lastName')) return res.badRequest('Please specify \'lastName\'');
    body = {
      email: req.param('email'),
      firstName: req.param('firstName'),
      latName: req.param('lastName')
    };
    // Add to database
    try {
      // Attempt to look the user up in the database.
      user = await User.create(body).fetch();
    } catch (err) {
      // If unknown error.
      switch (err.name) {
        case 'E_UNIQUE':
          return res.forbidden('There\'s an account associated to this e-mail.');
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err, 'Failed to create user');
      }
    }
    return res.ok(body);
  },
  // PATCH /user/:id
  // Edit a user info in the database.
  update: async function (req, res) {
    // VALIDATE
    if (!req.param('id')) return res.badRequest('Please specify \'id\'');

    let requestingUser = Number(req.token.userId),
      requestedUser = Number(req.param('id')),
      userId = await sails.helpers.requestedUser.with({
        req: req,
        res: res,
        requestingUser: requestingUser,
        requestedUser: requestedUser
      }),
      // Info to Update
      dataUpdate = {},
      resultingChanges;
    // Validate if data exists and add it
    if (req.param('firstName')) dataUpdate['firstName'] = req.param('firstName');
    if (req.param('lastName')) dataUpdate['lastName'] = req.param('lastName');
    if (req.param('email')) dataUpdate['email'] = req.param('email');

    // Update user in the database
    try {
      // Attempt to look the user up in the database.
      resultingChanges = await User.update(userId, dataUpdate).fetch();
    } catch (err) {
      // If unknown error.
      switch (err.name) {
        case 'UsageError':
          return res.badRequest(err);
        default:
          return res.serverError(err, 'Error updating user');
      }
    }
    if (resultingChanges.length>0)
      return res.ok(resultingChanges,'The user has been updated');
    return res.notFound('User could not be edited because it was not found.');
  },
};

