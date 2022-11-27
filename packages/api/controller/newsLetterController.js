const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const { environment } = require('../config/environment')
const {SENDGRID_API_KEY} =environment;
sgMail.setApiKey(SENDGRID_API_KEY); 

// Routes
exports.postSignup = async (req, res) => {
  const confNum = randNum();
  const params = new URLSearchParams({
    conf_num: confNum,
    email: req.body.email,
  });
  const confirmationURL = req.protocol + '://' + req.headers.host + '/confirm/?' + params;
  const msg = {
    to: req.body.email, // Change to your recipient
    from: 'akan.otong@pmt.ng', // Change to your verified sender
    subject: `Confirm your subscription to our newsletter`,
    html: `Hello ${req.body.email},<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}"> clicking here</a>.`
  }
  await addContact(req.body.email, confNum);
  await sgMail.send(msg);
  return res.status(200).json({ message: 'Thank you for signing up for our newsletter! Please complete the process by confirming the subscription in your email inbox.' });
};

exports.getConfirm = async (req, res) => {
  try {
    const contact = await getContactByEmail(req.query.email);
    if (contact == null) {
      throw `Contact not found.`;
    }
    if (contact.custom_fields.conf_num == req.query.conf_num) {
      const listID = await getListID('Newsletter Subscribers');
      await addContactToList(req.query.email, listID);
    } else {
      throw 'Confirmation number does not match';
    }
    return res.status(200).json(
      {
        message: 'You are now subscribed to our newsletter. We can\'t wait for you to hear from us!'
      });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Subscription was unsuccessful. Please try again' });
  }
};

exports.postUpload = async (req, res) => {
  const listID = await getListID('Newsletter Subscribers');
  const htmlNewsletter = req.files.newsletter.data.toString();
  await sendNewsletterToList(req, htmlNewsletter, listID)
  return res.status(200).json({
    message: 'Newsletter has been sent to all subscribers.'
  });
};

function randNum() {
  return Math.floor(Math.random() * 90000) + 10000;
}

async function addContact(email, confNum) {
  const customFieldID = await getCustomFieldID('conf_num');
  const data = {
    "contacts": [{
      "email": email,
      "custom_fields": {}
    }]
  };

  data.contacts[0].custom_fields[customFieldID] = confNum;
  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  return sgClient.request(request);
}

async function addContactToList(email, listID) {
  const data = {
    "list_ids": [listID],
    "contacts": [{
      "email": email
    }]
  };
  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  return sgClient.request(request);
}

async function getCustomFieldID(customFieldName) {
  const request = {
    url: `/v3/marketing/field_definitions`,
    method: 'GET',
  }
  const response = await sgClient.request(request);
  const allCustomFields = response[1].custom_fields;
  return allCustomFields.find(x => x.name === customFieldName).id;
}

async function getListID(listName) {
  const request = {
    url: `/v3/marketing/lists`,
    method: 'GET',
  }
  const response = await sgClient.request(request);
  const allLists = response[1].result;
  return allLists.find(x => x.name === listName).id;
}

async function sendNewsletterToList(req, htmlNewsletter, listID) {
  const data = {
    "query": `CONTAINS(list_ids, '${listID}')`
  };
  const request = {
    url: `/v3/marketing/contacts/search`,
    method: 'POST',
    body: data
  }
  const response = await sgClient.request(request);
  for (const subscriber of response[1].result) {
    const params = new URLSearchParams({
      conf_num: subscriber.custom_fields.conf_num,
      email: subscriber.email,
    });
    const unsubscribeURL = req.protocol + '://' + req.headers.host + '/delete/?' + params;
    const msg = {
      to: subscriber.email,
      from: 'SENDER_EMAIL', // Change to your verified sender
      subject: req.body.subject,
      html: htmlNewsletter + `<a href="${unsubscribeURL}"> Unsubscribe here</a>`,
    }
    sgMail.send(msg);
  }
}

async function deleteContactFromList(listID, contact) {
  const request = {
    url: `/v3/marketing/lists/${listID}/contacts`,
    method: 'DELETE',
    qs: {
      "contact_ids": contact.id
    }
  }
  await sgClient.request(request);
}

async function getContactByEmail(email) {
  const data = {
    "emails": [email]
  };
  const request = {
    url: `/v3/marketing/contacts/search/emails`,
    method: 'POST',
    body: data
  }
  const response = await sgClient.request(request);
  if (response[1].result[email]) return response[1].result[email].contact;
  else return null;
}
