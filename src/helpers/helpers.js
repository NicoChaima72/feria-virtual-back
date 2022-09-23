exports.isEmpty = (obj) => Object.keys(obj).length === 0;

exports.responseErrorField = (field, message) => ({
  ok: false,
  err: { fields: { [field]: { message } } },
});
