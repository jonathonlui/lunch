const createLunchData = ({
  id = 0,
  name = '',
  lat = 0,
  lng = 0,
  ...rest
}) => ({
  id: `mock-lunch-id-${id}`,
  name: name || `MockName-${id}`,
  location: {
    latitude: lat,
    longitude: lng,
  },
  ...rest
});

const getLunches = jest.fn(async () => [
  createLunchData({
    id: 1,
    lat: 1,
    lng: 2,
   }),
]);

const addSuggestion = jest.fn(async (data) => {});
export {
  getLunches,
  addSuggestion,
};
