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

async function getAll() {
  const locations = await locationRepository.findAll();
  if (locations.length === 0) {
    throw errorUtils.notFoundError('could not find any locations');
  }

  return locations;
}

async function locationIdExists(locationId: number) {
  const locationById = await locationRepository.findById(locationId);
  if (!locationById) {
    throw errorUtils.notFoundError('locationId does not exist');
  }
}

const locationServices = {
  create,
  getAll,
  locationIdExists,
};

export default locationServices;
