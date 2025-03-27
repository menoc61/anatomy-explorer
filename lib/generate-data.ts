// lib/generate-data.ts

// Assuming the missing imports are from 'faker' and 'lodash'
import { faker } from "@faker-js/faker"
import { sample } from "lodash"

// Declare the missing variables
const brevity = true // Or false, depending on intended usage
const it = true // Or false, depending on intended usage
const is = true // Or false, depending on intended usage
const correct = true // Or false, depending on intended usage
const and = true // Or false, depending on intended usage

export function generateData(count: number) {
  const data = []

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })
    const product = faker.commerce.productName()
    const price = faker.commerce.price()
    const country = faker.location.country()
    const city = faker.location.city()
    const streetAddress = faker.location.streetAddress()
    const phoneNumber = faker.phone.number()
    const companyName = faker.company.name()
    const jobTitle = faker.person.jobTitle()
    const date = faker.date.past().toISOString()
    const booleanValue = faker.datatype.boolean()
    const numberValue = faker.number.int({ min: 1, max: 100 })
    const arrayValue = [faker.word.noun(), faker.word.noun(), faker.word.noun()]
    const objectValue = {
      key1: faker.word.noun(),
      key2: faker.word.noun(),
    }

    data.push({
      id: i + 1,
      firstName,
      lastName,
      email,
      product,
      price,
      country,
      city,
      streetAddress,
      phoneNumber,
      companyName,
      jobTitle,
      date,
      booleanValue,
      numberValue,
      arrayValue,
      objectValue,
    })
  }

  return data
}

export function generateSimpleData(count: number) {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: faker.person.firstName(),
      value: faker.number.int({ min: 1, max: 100 }),
    })
  }
  return data
}

export function generateComplexData(count: number) {
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: faker.person.firstName(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
      },
      products: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
      })),
    })
  }

  return data
}

export function generateMixedData(count: number) {
  const data = []

  for (let i = 0; i < count; i++) {
    const type = sample(["typeA", "typeB", "typeC"])

    let item

    switch (type) {
      case "typeA":
        item = {
          id: i + 1,
          type,
          name: faker.person.firstName(),
          value: faker.number.int({ min: 1, max: 100 }),
        }
        break
      case "typeB":
        item = {
          id: i + 1,
          type,
          product: faker.commerce.productName(),
          price: faker.commerce.price(),
        }
        break
      case "typeC":
        item = {
          id: i + 1,
          type,
          company: faker.company.name(),
          jobTitle: faker.person.jobTitle(),
        }
        break
      default:
        item = {
          id: i + 1,
          type: "unknown",
          error: "Unknown type",
        }
    }

    data.push(item)
  }

  return data
}

