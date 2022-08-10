import { Location } from '@prisma/client';
import prisma from '../database/dbConfig.js';

export type NewLocationData = Omit<Location, 'id'>;

async function insert(newLocation: NewLocationData) {
  const insertedLocation = await prisma.location.create({
    data: newLocation,
  });

  return insertedLocation;
}

async function findRepeated(location: NewLocationData) {
  const uniqueLocation = await prisma.location.findFirst({
    where: {
      name: location.name,
      address: location.address,
    },
  });

  return uniqueLocation;
}

const locationRepository = {
  insert,
  findRepeated,
};

export default locationRepository;
