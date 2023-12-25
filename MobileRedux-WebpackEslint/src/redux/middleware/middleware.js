export async function fetchSomeData(dispatch, getState) {
  const response = await fetch(
    "https://fakerapi.it/api/v1/companies?_quantity=1"
  );
}
