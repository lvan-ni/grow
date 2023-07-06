import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/plants';

describe('Plant API', () => {
  let createdPlantId;

  it('should fetch all plants', async () => {
    const response = await axios.get(BASE_URL);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('should create a new plant', async () => {
    const newPlant = {
      name: 'Test name',
      light: 'Test light',
      water: 'Test water',
      note: 'Test note',
    };

    const response = await axios.post(BASE_URL, newPlant);
    expect(response.status).toBe(200);
    expect(response.data.acknowledged).toBe(true);
    createdPlantId = response.data._id;
  });

  // it('should update a plant', async () => {
  //   const updatedPlant = {
  //       name: 'Update name',
  //       light: 'Update light',
  //       water: 'Update water',
  //       note: 'Update note',
  //   };

  //   const response = await axios.put(`${BASE_URL}/${createdPlantId}`, updatedPlant);
  //   expect(response.status).toBe(200);
  //   expect(response.data.name).toBe(updatedPlant.name);
  //   expect(response.data.light).toBe(updatedPlant.light);
  //   expect(response.data.water).toBe(updatedPlant.water);
  //   expect(response.data.note).toBe(updatedPlant.note);
  // });

  it('should delete a plant', async () => {
    const response = await axios.delete(`${BASE_URL}/${createdPlantId}`);
    expect(response.status).toBe(200);
  });
});
