<template lang='pug'>
  div
    section.hero.is-light.is-bold.m-b-xl
      .hero-body
        .container
          h1.title Perceptron And
    .columns.is-multiline.is-centered.is-mobile.p-l-md.p-r-md
      .column.is-12
        form.columns.is-mobile.is-multiline(@submit.prevent='submit' @keydown.enter.prevent='submit')
          .field.column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Eta
            .control
              input.input(type='text' placeholder='eta' v-model='eta')
          button.button.is-rounded.is-primary.is-fullwidth.m-t-sm Procesar
      template(v-if='result')
        .column.is-6-tablet.is-12-mobile.m-t-sm
          article.message.is-medium
            .message-body Resultado:
              strong {{result}}
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'And',
  data: () => ({
    eta: 0
  }),
  methods: {
    submit () {
      this.i = 0
      let formData = new FormData()
      formData.append('eta', this.eta)

      axios.post('http://127.0.0.1:8000/api/perceptron/and', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
        .then(response => {
          this.result = response.data.result// delete bytes python format( b'')
        })
        .catch(e => {
          console.log('error' + e)
        })
    }
  }
}
</script>
