<template>
  <div ref="display"></div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      deflt: ''
    }
  },
  data () {
    return {
      html: '',
      js: '',
      css: ''
    }
  },
  methods: {
    getSource (source, type) {
      const regex = new RegEx(`<${type}[^>]*>`)
      let openingTag = source.match(regex)
      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode () {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return')
      const style = this.getSource(this.code, 'style')
      const template = '<div id="app">'+ +'</div>'

      this.js = script
      this.css = style
      this.html = template
    },
    renderCode () {
      this.splitCode()
      if (this.html !== '' && this.js !== '') {
        const parseStrToFunc = new Function(this.js)()
      }
    }
  }
}
</script>

<style>

</style>