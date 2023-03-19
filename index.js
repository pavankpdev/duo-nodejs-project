const app = require('express')();
const mongoose = require('mongoose');
const express = require('express');

// MODELS
const UserModel = require('./models/User')

// VALIDATION
const RegisterPayloadValidation = require('./validation/registerIUser')
const LoginPayloadValidation = require('./validation/loginUser')

mongoose.connect('mongodb+srv://duo:duo@duodb.q7jwimg.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json())

app.post('/auth/register',
    async (req, res) =>   {
    try {
        const payload = req.body.user;

        const {error: bodyValidationError} = await RegisterPayloadValidation.validateAsync(payload)

        if(bodyValidationError) {
            return res.status(500).json({error: bodyValidationError?.details});
        }

        const emailExist = await UserModel.findOne({ email: payload.email })

        if(emailExist) {
            return res.status(400).json({error: `Email already exist`})
        }

        const phnoExist = await UserModel.findOne({ phno: payload.phno })

        if(phnoExist) {
            return res.status(400).json({error: `Phone number already exist`})
        }

        const user = new UserModel(payload)

        await user.save()
        res.status(201).json({
            data: user,
            status: "Success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
)

app.post('/auth/login', async (req, res) => {

    try {
        const payload = req.body.user;

        const {error: bodyValidationError} = await LoginPayloadValidation.validateAsync(payload)

        if(bodyValidationError) {
            return res.status(500).json({error: bodyValidationError?.details});
        }

        const user = await UserModel.findOne({
            email: payload.email
        })

        if(!user) {
            return res.status(404).json({
                error: `User with the email ${payload.email}, Not found`
            })
        }

        res.status(201).json({
            data: user,
            status: "Success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})