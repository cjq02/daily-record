db.createUser({
    user: 'cjq',
    pwd: '123456',
    roles: [
        {
            role: 'readWrite',
            db: 'daily-record-db'
        }
    ]
});