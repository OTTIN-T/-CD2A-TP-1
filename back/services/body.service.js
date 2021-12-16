async function bodyLengthValidator(body) {
  try {
    Object.keys(body).map((key) => {
      if (body[key].length == 0) {
        return (body = false);
      }
    });
    return body;
  } catch (error) {
    return false;
  }
}

async function bodyTrim(body) {
  try {
    Object.keys(body).map(
      (key) =>
        (body[key] =
          typeof body[key] == "string" ? body[key].trim() : body[key])
    );
    return body;
  } catch (error) {
    return false;
  }
}

async function bodyValidator(body) {
  try {
    const bodyValidate = await this.bodyTrim(body)
      .then(async (bodyTrimed) => {
        return await this.bodyLengthValidator(bodyTrimed);
      })
      .catch((error) => console.log(error));
    return bodyValidate;
  } catch (error) {
    return false;
  }
}

module.exports = {
  bodyLengthValidator,
  bodyValidator,
  bodyTrim,
};
