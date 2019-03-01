<template lang='pug'>
  .columns.is-multiline.is-centered.is-mobile.p-l-md.p-r-md
    .column.is-12
      p.has-text-centered.p-t-sm.p-b-md.has-text-weight-bold.is-size-5 Algoritmo genético
      form.columns.is-mobile.is-multiline(@submit.prevent='submit' @keydown.enter.prevent='submit')
        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 N (población)
          .control
            input.input.is-small(type='number' placeholder='población total' v-model='n')

        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 a (intervalo inicial de x)
          .control
            input.input.is-small(type='number' placeholder='0' v-model='a')

        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 b (intervalo final de x)
          .control
            input.input.is-small(type='number' placeholder='0' v-model='b')

        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 c (intervalo inicial de y)
          .control
            input.input.is-small(type='number' placeholder='0' v-model='c')

        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 d (intervalo final de y)
          .control
            input.input.is-small(type='number' placeholder='0' v-model='d')

        .column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 Poda
          .field.has-addons
            p.control
              span.select.is-small
                select(v-model='option_trim')
                  option(value='1') porcentaje
                  option(value='2') Tamaño máximo
            p.control
              input.input.is-small(type='number' placeholder="Opción de poda" v-model='poda')

        .column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 Condicion de paro
          .field.has-addons
            p.control
              span.select.is-small
                select(v-model='option_stop')
                  option(value='1') Generación maxima
                  option(value='2') Porcentaje
            p.control
              input.input.is-small(type='number' placeholder="Condicion de paro" v-model='stop')

        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 Mutacion por individuo
          .control
            input.input.is-small(type='text' placeholder='0' v-model='mut_ind_prob')

        .field.column.is-3-tablet.is-4-mobile.m-b-0
          label.label.is-size-6 Mutacion por gen
          .control
            input.input.is-small(type='text' placeholder='0' v-model='mut_prob_gene')

        button.button.is-rounded.is-primary.is-fullwidth.m-t-sm Procesar
    .column.is-6(v-if='imgUrl')
      p.has-text-centered.has-text-weight-bold Estadísticas
      img(:src="'data:image/png;base64,'+ imgUrl")
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'home',
  data: () => ({
    n: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    option_stop: 0,
    stop: 0,
    option_trim: '',
    max_size: 0,
    poda: 0,
    mut_ind_prob: 0,
    mut_prob_gene: 0,
    text: '',
    imgUrl: ''
  }),
  methods: {
    submit () {
      let formData = new FormData()
      formData.append('a', this.a)
      formData.append('b', this.b)
      formData.append('c', this.c)
      formData.append('d', this.d)
      formData.append('n', this.n)
      formData.append('option_trim', this.option_trim)
      formData.append('poda', this.poda)
      formData.append('option_stop', this.option_stop)
      formData.append('stop', this.stop)
      formData.append('mut_ind_prob', this.mut_ind_prob)
      formData.append('mut_prob_gene', this.mut_prob_gene)

      axios.post('http://127.0.0.1:8000/api/toto', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
        .then(response => {
          this.imgUrl = response.data.img.substr(2, response.data.img.length - 3) // delete bytes python format( b'')
        })
        .catch(e => {
          console.log('error' + e)
        })
    }
  }
}
</script>
