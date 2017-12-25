/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
exports.subscribe = function subscribe(event, callback) {
  // The Cloud Pub/Sub Message object.
  const pubsubMessage = event.data;

  // We're just going to log the message to prove that
  // it worked.
  let input = Buffer.from(pubsubMessage.data, 'base64').toString();
  let obj = JSON.parse(input);
  console.log(obj);

  if (obj.status == "SUCCESS") {
    console.log(obj.images);
  }

  // Don't forget to call the callback.
  callback();
};
