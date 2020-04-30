# Pio Model Generator
> A tool that generate formated pio models in a fast speed

## Basic Usage:
Delete old static folder and create new one.(Be careful)
<pre>node index.js</pre>

## Use with [Pio](https://github.com/Dreamer-Paul/Pio)
### Pio Model Generator can help you change pio's texture randomly when refreshing page
Example:
<pre>
var pio = new Paul_Pio({  
  ...  
  "model": [`static/models/pio-${pio_models[Math.floor((Math.random()*pio_models.length))]}/model.json`]
});
</pre>

## Thanks 
### Thanks for providing ideas and material
[Pio](https://github.com/Dreamer-Paul/Pio)  
[live2d_api](https://github.com/fghrsh/live2d_api)