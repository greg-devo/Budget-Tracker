const db = require('../util/database');

module.exports = class Transaction {
    constructor(id, type, amount, date, description, category) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.category = category;
    }
    static getAll () {
        return db.execute("select * from transactions")
    }
    static getByID (id) {
        return db.execute("select * from transactions where id = ?", [id]);
    }
    add () {
        return db.execute("insert into transactions (id, type, amount, date, description, category) values (?, ?, ?, ?, ?, ?)",
            [this.id, this.type, this.amount, this.date, this.description, this.category])
    }
    update (id) {
        console.log([this.type, this.amount, this.date, this.description, this.category, id]);
        return db.execute( "update transactions set type = ?, amount = ?, date = ?, description = ?, category = ?  WHERE id = ?",
            [this.type, this.amount, this.date, this.description, this.category, id ] );
    }
    static delete(id) {
        return db.execute( "delete from transactions where id = ?" ,
            [id] );
    }
    static dateToSQL(date) {
        const tDate = new Date(date);
        return tDate.toISOString().split('T')[0];
    }
    static getMaxID() {
        let maxID = db.execute("select coalesce(max(id), 0) as maxID from transactions");
        return parseInt(maxID);
    }
    static getIncome() {
        return db.execute("select sum(amount) as income from transactions where type = 'Income'")
    }
    static getExpenses() {
        return db.execute("select sum(amount) as expenses from transactions where type = 'Expense'")
    }
    static getBalance() {
        return db.execute("select(select sum(amount) from transactions where type = 'Income') - (select sum(amount) from transactions where type = 'Expense') as balance")
    }
}

