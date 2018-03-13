/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
exports.subscribe = function subscribe(event, callback) {
  const domains = {
    "badtaco": "badta.co",
    "cacophony": "cacophony.natwelch.com",
    "giftionary": "giftionary.city",
    "hello": "hello.natwelch.com",
    "inspiration": "inspiration.natwelch.com",
    "life": "life.natwelch.com",
    "melandnat": "melandnat.com",
    "natwelch": "natwelch.com"
    "quotes": "quotes.natwelch.com",
    "resume": "resume.natwelch.com",
    "walls": "walls.natwelch.com",
    "writing-be": "writing-be.natwelch.com",
    "writing-fe": "writing.natwelch.com",
  }

  // The Cloud Pub/Sub Message object.
  const pubsubMessage = event.data;

  // We're just going to log the message to prove that
  // it worked.
  let input = Buffer.from(pubsubMessage.data, 'base64').toString();
  let obj = JSON.parse(input);
  console.log(`Recieved: ${obj}`);

  if (obj.status == "SUCCESS") {
    obj.images.forEach(function(img) {
      let url = img.split(":")[0];
      let repo = url.split("/")[2];
      console.log(`Update: kubectl patch deployment --namespace=${repo} ${domains[repo]} -p '{"spec":{"template":{"spec":{"containers":[{"name":"${repo}","image":"${img}"}]}}}}'`);
    });
  }

  // Don't forget to call the callback.
  callback();
};
