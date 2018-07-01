/* eslint-disable one-var */

/**
 * api/responses/badRequest.js
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.barRequest();
 * return res.barRequest(err);
 *
 * Based on JSend responses, with a small variation on failed responses.
 * https://labs.omniti.com/labs/jsend
 */

module.exports = function(data, message) {
  // Response configuration
  const statusCode = 400,
    JSONStatus = 'fail',
    defaultMessage = 'Bad Request';
    // viewFilePath = 'badRequest';

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
  // Optional message
  if (message)
    result.message = message;
  else
    result.message = defaultMessage;
  // Optional data
  if (data)
    result.data = data;
  else
    result.data = null;

  // If the user-agent wants a JSON response, send json
  if (req.wantsJSON)
    return res.status(statusCode).json(result);

  // Set status code and view locals
  res.status(statusCode);
  for (let key in result)
    res.locals[key] = result[key];
  return res.locals;
  // // And render view
  // return res.view(viewFilePath, result, (err) => {
  //   // If the view doesn't exist, or an error occurred, send json
  //   if (err)
  //   res.status(statusCode).json(result);
  //   // Otherwise, serve the `views/mySpecialView.*` page
  //   return res.view(viewFilePath);
  // });

};
