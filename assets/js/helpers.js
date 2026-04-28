function showAlert(message) {

  alert(message);

}

function calculateAge(dateString) {

  if (!dateString) return "";

  const today = new Date();

  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();

  const month = today.getMonth() - birthDate.getMonth();

  if (
    month < 0 ||
    (
      month === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age--;
  }

  return age;

}

function calculatePeriod(start, end) {

  if (!start || !end) return "";

  const startDate = new Date(start);

  const endDate = new Date(end);

  const diff = Math.ceil(
    (endDate - startDate) /
    (1000 * 60 * 60 * 24)
  );

  return diff + " Hari";

}
