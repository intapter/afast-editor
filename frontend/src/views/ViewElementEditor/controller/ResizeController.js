export default class {

  MIN_WIDTH = 100
  MAX_WIDTH = 500

  constructor(context) {
    this.context = context
  }

  isResize = false
  onMouseMove = null
  onMouseUp = null

  onMounted() {
    this.onMouseMove = (e) => {
      
      if (this.isResize) {
        this.context.fields.width = Math.max(this.MIN_WIDTH, Math.min(this.MAX_WIDTH, this.context.fields.width + e.movementX))
      }
    }
    this.onMouseUp = () => {
      window.document.body.style.cursor = null
      this.isResize = false
    }
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  onUnmounted() {
    
    if (this.onMouseMove) {
      window.removeEventListener('mousemove', this.onMouseMove)
    }
    if (this.onMouseUp) {
      window.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  startResize() {
    this.isResize = true
    window.document.body.style.cursor = 'ew-resize'
  }
}