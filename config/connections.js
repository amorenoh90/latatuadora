module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk',
    schema: true
  },

  latatuadoraMysqlServer: {
    adapter: 'sails-mysql',
    host: 'sandbox.latatuadora.getmore.mx', //'35.161.232.194',
    user: 'latatuadora', //optional
    password: 'latatuadora', //optional
    database: 'latatuadora_core' //optional
  },

  testInMemoryDatabase: {
    adapter: 'sails-memory',
  }
};
