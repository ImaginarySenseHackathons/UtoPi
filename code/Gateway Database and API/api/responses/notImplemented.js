/* eslint-disable one-var */
/**
 * api/responses/notImplemented.js
 * 501 (Not Implemented) Handler
 *
 * Usage:
 * return res.notImplemented();
 * return res.notImplemented(err);
 *
 * Based on JSend responses, with a small variation on failed responses.
 * https://labs.omniti.com/labs/jsend
 */

module.exports = function(data) {
  // Response configuration
  const statusCode = 501,
    JSONStatus = 'error',
    message = 'Not Implemented',
    viewFilePath = 'notImplemented';

  // Get req and res
  let req = this.req,
    res = this.res;

  if (data !== undefined)
    sails.log.verbose('Sending '+statusCode+' ("'+message+'") response: \n', data);
  else
    sails.log.verbose('Sending '+statusCode+' ("'+message+'") response');

  // Prepare response
  let result = {
    status: JSONStatus,
    code: statusCode,
    message: message
  };
  // Only include errors in response if application environment is not set to 'production'.
  // In production, we shouldn't send back any identifying information about errors.
  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true)
    data = undefined;
  // Optional data
  if (data)
    result.data = data;

  // If the user-agent wants a JSON response, send json
  if (req.wantsJSON)
    return res.status(statusCode).json(result);


  // Set status code and view locals
  res.status(statusCode);
  for (let key in result)
    res.locals[key] = result[key];

  // And render view
  res.view(viewFilePath, result, function(err) {
    // If the view doesn't exist, or an error occurred, send json
    if (err)
      return res.status(statusCode).json(result);

    // Otherwise, serve the `views/mySpecialView.*` page
    return res.view(viewFilePath);
  });

};
