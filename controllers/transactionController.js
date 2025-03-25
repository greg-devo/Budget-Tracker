const Transaction = require('../models/Transaction');

exports.renderHome = async (req, res) => {
    Transaction.getIncome()
        .then((income) => {
            income = income[0][0].income;
            Transaction.getExpenses()
                .then((expenses) => {
                    console.log(expenses)
                    expenses = expenses[0][0].expenses;
                    let balance = (income - expenses).toFixed(2);
                    console.log(income)
                    console.log(expenses)
                    console.log(balance)
                    res.render('home', {
                        title: 'Home',
                        income: income,
                        expenses: expenses,
                        balance: balance
                    })
                })
        })
};
exports.renderTransactions = async (req, res) => {
    Transaction.getAll()
        .then(([transactions, fields]) => {
            let hasTransaction = transactions.length > 0;
            res.render('transactions', {
                title: 'Transaction History',
                hasTransaction: hasTransaction,
                transactions: transactions
            })
        })
        .catch((err) => {
            console.error('Error getting transactions: ', err);
        });
}
exports.renderAddTransaction = async (req, res) => {
    res.render('addTransaction', {
        title: 'Add Transaction',
    })
};
exports.addTransaction = async (req, res) => {
    Transaction.getMaxID()
        .then((maxID) => {
            const newID = parseInt(maxID) + 1;
            const date = Transaction.dateToSQL(req.body.date);
            let transaction = new Transaction(newID, req.body.type, req.body.amount, date, req.body.description, req.body.category);
            transaction.add()
                .then(() => {
                    res.redirect('/transactions');
                });
        });

};
exports.renderEditTransaction = async (req, res) => {
    let id = req.params.id;
    let isIncome = false;
    if (req.params.type === "Income") isIncome = true;
    Transaction.getByID(id)
        .then(([transaction, fields]) => {
            res.render('editTransaction', {
                title: `Edit Transaction`,
                transaction: transaction[0],
                income: isIncome
            });
        });
};
exports.updateTransaction = async (req, res) => {
    let id = req.params.id;
    let date = Transaction.dateToSQL(req.body.date);
    let transaction = new Transaction(id, req.body.type, req.body.amount, date, req.body.description, req.body.category)
    transaction.update(id)
        .then(() => {
            res.redirect('/transactions');
        });
};
exports.deleteTransaction = async (req, res) => {
    let id = req.params.id;
    Transaction.delete(id)
        .then(() => {
            res.redirect('/transactions');
        });
};
