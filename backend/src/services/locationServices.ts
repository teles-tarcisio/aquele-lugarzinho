import { locationRepository } from '../repositories/index.js';
import { errorUtils } from '../utils/index.js';
import { NewLocationData } from '../repositories/locationRepository.js';

async function isRepeated(newLocation: NewLocationData) {
  const location = await locationRepository.findRepeated(newLocation);
  if (location) {
    throw errorUtils.conflictError('location with same name and address already exists');
  }

  return location;
}

async function create(newLocation: NewLocationData) {
  await isRepeated(newLocation);

  const createdLocation = await locationRepository.insert(newLocation);
  return createdLocation;
}

const locationServices = {
  create,
};

export default locationServices;
