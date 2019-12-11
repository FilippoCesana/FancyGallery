/* Fetch */

var methods_all = ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"];
var methods_string = ["POST", "PUT", "PATCH"];
var methods_undefined = ["GET", "OPTIONS", "HEAD", "DELETE"];
var header_no = ["Content-Type", "Accept"];

/**
 * @function doFetchRequest
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be undefined if there are no headers.
 * @param {String} body The body String to be sent to the server. It must be undefined if there is no body.
 * @returns {Promise} which receives the HTTP response.
 */

function doFetchRequest(method, url, headers, body) {
  if (arguments.length !== 4) {
    throw new Error(`the arguments aren't enough`);
  }
  if (
    method === "GET" ||
    method === "POST" ||
    method === "DELETE" ||
    method === "PUT"
  ) {
    if (method === "GET") {
      if (body) {
        throw new Error(`the body should be undefined`);
      } else {
        return fetch(url, {
          method: method,
          headers: headers
        });
      }
    } else if (method === "POST" || method === "PUT") {
      if (body === null || typeof body === "string") {
        if (method === "PUT") {
          console.log(
            fetch(url, {
              method: method,
              body: body,
              headers: headers
            })
          );

          return fetch(url, {
            method: method,
            body: body,
            headers: headers
          });
        } else if (method === "POST") {
          return fetch(url, {
            method: method,
            body: body,
            headers: headers
          });
        } else {
          throw new Error(`the method isn't POST nor PUT`);
        }
      } else {
        throw new Error(`invalid method`);
      }
    } else if (method === "DELETE") {
      return fetch(url, {
        method: method,
        headers: headers
      });
    } else {
      console.log("method not correct");
      throw new Error(`incorrect method`);
    }
  } else {
    console.log("error");
    throw new Error(`Error`);
  }
}

/** @function doJSONRequest
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be undefined if there are no headers.
 * @param {Object} body The object to be sent as JSON body to the server. It must be undefined if there is no body.
 * @returns {Promise} which receives directly the object parsed from the response JSON.
 */

function doJSONRequest(method, url, headers, body) {
  var data = body;

  if (
    ("Content-Type" in headers &&
      headers["Content-Type"] !== "application/json") ||
    ("Accept" in headers && headers["Accept"] !== "application/json")
  ) {
    throw new Error(`headers object contains Content-Type or Accept`);
    return;
  }

  if (methods_string.includes(method)) {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      throw new Error("The data can't be transformed to json.");
      return;
    }
  } else if (methods_undefined.includes(method) && data !== undefined) {
    throw new Error("The data is not undefined");
    return;
  }

  headers["Accept"] = "application/json";

  if (methods_string.includes(method)) {
    headers["Content-Type"] = "application/json";
  }

  return doFetchRequest(method, url, headers, data).then(res => {
    return res.json();
  });
}
