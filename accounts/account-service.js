module.exports = {
    isValidAccount,
}

function isValidAccount(account){
    return Boolean(account.name && account.budget)
}