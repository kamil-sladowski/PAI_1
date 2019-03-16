// const boom = require('boom')

// Get Data Models
const Car = require('../models/article')

// Get all cars
exports.getCars = async (req, reply) => {
    try {
        const cars = await Car.find()
        return cars
    } catch (err) {
        // throw boom.boomify(err)
        console.log("errorrrrrrrrr")
    }
}

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = await Car.findById(id)
        return car
    } catch (err) {
        // throw boom.boomify(err)
        console.log("errorrrrrrrrr")
    }
}

// Add a new car
exports.addCar = async (req, reply) => {
    try {
        const car = new Car(req.body)
        return car.save()
    } catch (err) {
        // throw boom.boomify(err)
        console.log("errorrrrrrrrr");
    }
}

// Update an existing car
exports.updateCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = req.body
        const { ...updateData } = car
        const update = await Car.findByIdAndUpdate(id, updateData, { new: true })
        return update
    } catch (err) {
        // throw boom.boomify(err)
        console.log("errorrrrrrrrr");
    }
}

// Delete a car
exports.deleteCar = async (req, reply) => {
    try {
        const id = req.params.id
        const car = await Car.findByIdAndRemove(id)
        return car
    } catch (err) {
        // throw boom.boomify(err)
        console.log("errorrrrrrrrr")
    }

}