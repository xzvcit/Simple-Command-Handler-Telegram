type Keyboard = (Btn | Btn[])[];

interface Btn {
  key: string;
  void: (ctx: any) => any;
}

export default class CoreCommandHandler {
  void;
  onNotFound = (ctx) => ctx.reply('Command not found');
  keyboard: Keyboard = [
    { key: 'Say hello', void: (ctx) => ctx.reply('hello!') },
    [
      { key: 'Say hello', void: (ctx) => ctx.reply('hello!') },
      { key: 'Say hello', void: (ctx) => ctx.reply('hello!') },
    ],
  ];

  static init(keyboard: Keyboard) {
    let result = new CoreCommandHandler();
    result.keyboard = keyboard;

    return result;
  }

  setOnNotFound(_void) {
    this.onNotFound = _void;
  }

  getKeyboardButtons() {
    return this.keyboard.map((item) => {
      if (Array.isArray(item)) {
        return item.map((_item) => _item.key);
      } else {
        return [item.key];
      }
    });
  }

  handle(ctx: any) {
    if (typeof ctx.message.text !== 'undefined') {
      let callback;

      this.keyboard.map((i) => {
        if (Array.isArray(i)) {
          i.forEach((item) => {
            if (item.key === ctx.message.text) {
              callback = item.void;
            }
          });
        } else {
          if (i.key === ctx.message.text) {
            callback = i.void;
          }
        }
      });

      if (typeof callback === 'function') {
        return callback(ctx);
      }

      return this.onNotFound(ctx);
    }
  }
}
