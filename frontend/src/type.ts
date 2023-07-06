// interface PlantT {
//   name: string;
//   light: string;
//   water: string;
//   note: string;
// };

// interface Plant {
//   _id: string;
//   name: string;
//   light: string;
//   water: string;
//   note: string;
// }

export type PlantT = {
  _id: string,
  name: string;
  light: string;
  water: string;
  note: string;
};

export type NewPlantT = {
  name: string;
  light: string;
  water: string;
  note: string;
};