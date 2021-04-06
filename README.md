#### 🤖 Initialization and rule declarations
#
```js
let commandHandler = CoreCommandHandler.init([
        {
            key: '👥 Active accounts',
            void: (ctx) => getActiveAccounts(ctx)
        },
        [
            {
                key: '💠 Add account',
                void: (ctx) => ctx.scene.enter('addNewAccountScene')
            },
            {
                key: '◀️ Back',
                void: (ctx) => ctx.scene.enter('adminMenuScene')
            }
        ]
]);
```

#### ⌨️ Showing the keyboard
#
```js
scene.enter((ctx) => {
    ctx.reply('Choose the category', Markup.keyboard(commandHandler.getKeyboardButtons()).resize().extra());
});
```
#### 💨 From the receiving point to the handler
#
```js
scene.on('text', (ctx: any) => commandHandler.handle(ctx));
```

#### ⚠️ Command not found
* As an argument for this method, you can use any function and take **ctx**
```js
commandHandler.setOnNotFound((ctx) => ctx.reply('🤖 I can\'t execute this command'));
```