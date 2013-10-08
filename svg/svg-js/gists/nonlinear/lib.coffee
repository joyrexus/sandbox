class Nonlinear

  constructor: (canvas) ->
    @canvas = @element = canvas
    
    @width = parseInt(canvas.width)
    @height = parseInt(canvas.height)
    @ctx = @canvas.getContext("2d")
    
    @plotScale = 50
    @plotOffsetX = @width/2
    @plotOffsetY = @height/2

    @timeStep = 10e-3
    @hasReset = false

    @backgroundImage = new Image()
    @backgroundImage.src = "background.png"
  
  updateAnimation: =>
    now = Date.now()
    dt = 0.001 * (now - (@lastTimestamp || now))
    @lastTimestamp = now
    return null if dt is 0
    @reset() if not @hasReset
    
    @currentTime += dt
    @currentTimeModStep += dt

    while @currentTimeModStep > @timeStep
      @currentTimeModStep -= @timeStep
      @tick(@timeStep)
    
    @drawInContext(@ctx)
    @reset() if @currentTime > 18
  
  reset: () =>
    @hasReset = true
    
    @currentTime = 0
    @currentTimeModStep = 0
    @x = -1
    @y = 0
    
    @ctx.drawImage(@backgroundImage, 0, 0)
    @ctx.closePath()
    @ctx.lineWidth = 1
    @ctx.strokeStyle = "#2392d9"
    @ctx.beginPath()
    @ctx.moveTo(@x * @plotScale + @plotOffsetX, -@y * @plotScale + @plotOffsetY)
  
  tick: (dt) =>
    dx = dt * @y
    dy = dt * (-0.5 * @y - 5 * Math.sin(@x))
    @x += dx
    @y += dy

    @ctx.lineTo(@x * @plotScale + @plotOffsetX, -@y * @plotScale + @plotOffsetY)
  
  drawInContext: (ctx) =>
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(@x * @plotScale + @plotOffsetX, -@y * @plotScale + @plotOffsetY)


window.Nonlinear = Nonlinear
