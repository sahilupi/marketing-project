const mongoose = require('mongoose');

const Currency = mongoose.model('Currency');

module.exports.getCurrencies = (req, res, next) => {
    try {
        Currency.find().then(currencies => {
            if (!currencies || currencies.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No currencies found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    currencies: currencies
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.getCurrency = (req, res, next) => {
    try {
        Currency.findById(req.params.id)
        .then(currency => {
            if (!currency || currency.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No currency found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    currency: currency
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.postCurrency = async (req, res, next) => {
    try {
        const currency = new Currency({
            currency: req.body.currency
        });
        currency.save().then((savedCurrency) => {
            if (!savedCurrency) {
                return res.status(503).send({
                    success: false,
                    message: 'Currency can not be saved! Please try again.'
                });
            }
            return res.status(201).send({
                success: true,
                message: 'Currency saved succussfully!',
                currency: savedCurrency
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};
