const db = require('../data/dbConfig')

const router = require('express').Router()

const {isValidAccount} = require('./account-service')

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Unable to retrieve accounts', error: err.message})
    })
})

router.get('/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .first()
    .then(account => {
        if(account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({ message: 'No account by that Id'})
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: 'Unable to retrieve account', error: err.message})
    })
})

router.post('/', (req, res) => {
    const account = req.body
    if(isValidAccount(account)){
        db('accounts')
        .insert(account,'id')
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Unable to add account', error: err.message})
        })
    } else {
        res.status(400).json({ message: 'Please provide name and budget for the account'})
    }
})

router.put('/:id', (req, res) => {
    const accChanges = req.body
    if(isValidAccount(accChanges)){
        db('accounts').where({id: req.params.id})
        .update(accChanges)
        .then(count => {
            if( count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: 'account not found by that ID' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Unable to modify account', error: err.message})
        })
    } else {
        res.status(400).json({ message: 'Please provide name and budget for the account'})
    }
})

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id})
    .del()
    .then(count => {
        if( count > 0) {
            res.status(200).json(count)
        } else {
            res.status(404).json({ message: 'Account not found by that ID'})
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: 'Unable to delete account', error: err.message })
    })
})

module.exports = router;