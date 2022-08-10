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

async function findAll() {
  const allLocations = await prisma.location.findMany();

  return allLocations;
}

async function findById(locationId: number) {
  const promise = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  });

  return promise;
}

const locationRepository = {
  insert,
  findRepeated,
  findAll,
  findById,
};

export default locationRepository;
