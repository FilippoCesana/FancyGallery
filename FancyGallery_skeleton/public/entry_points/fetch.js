/* Fetch */

var methods_all = ['POST','PUT','PATCH','GET','OPTIONS','HEAD','DELETE'];
var methods_string = ['POST','PUT','PATCH'];
var methods_undefined = ['GET','OPTIONS','HEAD','DELETE'];
var header_no = ['Content-Type','Accept'];

/**
 * @function doFetchRequest
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be undefined if there are no headers.
 * @param {String} body The body String to be sent to the server. It must be undefined if there is no body.
 * @returns {Promise} which receives the HTTP response.
 */

function doFetchRequest(method, url, headers, body){

  //  if method not one of: ['POST','PUT','PATCH','GET','OPTIONS','HEAD','DELETE']
  if (!(methods_all.includes(method))) {
    throw new Error ( "The " + method + "is not an accepted method");
    return;
  }

  //if method not one of: 'POST' 'PUT' 'PATCH' and body type is not 'string';
  if ((methods_string.includes(method)) && typeof body != 'string') {
    throw new Error ( "The " + method + "is not an accepted method");
    return;
  }

  //else if method not one of:'GET' 'OPTIONS' 'HEAD' 'DELETE' and body type is not undefined;
  else if ((methods_undefined.includes(method)) && body !== undefined) {
    throw new Error ( "The " + method + "is not an accepted method");
    return;
  }

  return fetch(url, {
    method: method,
    headers: headers,
    body: body
  });
}


/** @function doJSONRequest
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be undefined if there are no headers.
 * @param {Object} body The object to be sent as JSON body to the server. It must be undefined if there is no body.
 * @returns {Promise} which receives directly the object parsed from the response JSON.
 */

function doJSONRequest(method, url, headers, body){
  var data = body;

  // if (header_no.includes(headers)) { //fare un for
  //   throw new Error ( "The " + header + "is not an accepted header.");
  //   return;
  // }

  // for (var i = 0; i < headers.length; i++){
  //   if (header_no.includes(headers[i]) && headers[i] !== 'application/json' ) {
  //     throw new Error ( "The " + header + "is not an accepted header.");
  //     return;
  //   }
  // }

  if (('Content-Type' in headers && headers['Content-Type'] !== 'application/json') || 
      ('Accept' in headers && headers['Accept'] !== 'application/json')) {
    throw new Error(`headers object contains Content-Type or Accept`);
    return;
  }

  if (methods_string.includes(method)) {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      throw new Error ( "The data can't be transformed to json.");
      return;
    }
  }
  else if ((methods_undefined.includes(method)) && data !== undefined) {
    throw new Error ( "The data is not undefined");
    return;
  }

  headers['Accept'] = 'application/json';

  if (methods_string.includes(method)){
    headers['Content-Type'] = 'application/json';
  }

  return doFetchRequest(method, url, headers, data)
  .then(res => {return res.json()});
}
