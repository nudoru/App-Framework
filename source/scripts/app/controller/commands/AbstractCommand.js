/**
 * Extended by creating new object using methods as prototype
 */

APP.createNameSpace('APP.AbstractCommand');
APP.AbstractCommand = {
  methods: {
    execute: function (data) {
      throw new Error('AbstractCommand: Must subclass and override execute()');
    }
  }
};