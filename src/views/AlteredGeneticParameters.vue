<template lang='pug'>
  div
    section.hero.is-light.is-bold.m-b-xl
      .hero-body
        .container
          h1.title Determina tu menú
          h2.subtitle Con este algoritmo genético (alterado)
    .columns.is-multiline.is-centered.is-mobile.p-l-md.p-r-md
      .column.is-12
        form.columns.is-mobile.is-multiline(@submit.prevent='submit' @keydown.enter.prevent='submit')
          .field.column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Población inicial
            .control
              input.input(type='number' placeholder='Población' v-model='n')

          .field.column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Número de cromosomas
            .control
              input.input(type='number' placeholder='Número de cromosomas' v-model='chro_size')

          .column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Poda
            .field.has-addons
              p.control
                span.select
                  select(v-model='option_trim')
                    option(value='1') porcentaje
                    option(value='2') Tamaño máximo
              p.control.is-expanded
                input.input(type='number' placeholder="Opción de poda" v-model='poda')

          .column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Condicion de paro
            .field.has-addons
              p.control
                span.select
                  select(v-model='option_stop')
                    option(value='1') Generación maxima
                    option(value='2') Margen de error en kcal
              p.control.is-expanded
                input.input(type='number' placeholder="Condicion de paro" v-model='stop')

          .field.column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Probabilidad de cruza
            .control
              input.input(type='text' placeholder='0' v-model='crossover_prob')

          .field.column.is-6-tablet.is-12-mobile.m-b-0
            label.label.is-size-6 Probabilidad de mutación
            .control
              input.input(type='text' placeholder='0' v-model='mut_prob')
          button.button.is-rounded.is-primary.is-fullwidth.m-t-sm Procesar
      template(v-if='result')
        .column.is-6-tablet.is-12-mobile.m-t-sm
          article.message.is-medium
            .message-body kcal recomendadas:
              strong {{energy}}
        .column.is-6-tablet.is-12-mobile.m-t-sm
          article.message.is-medium
            .message-body kcal en el menú:
              strong {{sum}}
        .column.is-12.m-t-sm(v-if='result')
          p.has-text-centered.has-text-weight-bold Menú
          table.table.is-striped.is-bordered.is-fullwidth
            thead
              tr.is-selected
                th ID
                th Grupo de comida
                th Nombre
                th Kcal
                th Proteínas
                th Grasas
                th Carbohidratos
                th Tamaño de proporción
            tbody
              tr(v-for='food in result' :key="i++")
                th {{food.id}}
                td {{food.food_group}}
                td {{food.food_name}}
                td {{food.kcal}}
                td {{food.protein}}
                td {{food.fat}}
                td {{food.carbs}}
                td {{food.size}} gr
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'AlteredGeneticParameter',
  data: () => ({
    i: 0,
    n: 0,
    chro_size: 0,
    crossover_prob: 0.0,
    mut_prob: 0.0,
    result: '',
    option_stop: 0,
    stop: 0,
    option_trim: 0,
    poda: 0,
    energy: 0,
    sum: 0
  }),
  methods: {
    submit () {
      this.i = 0
      this.energy = JSON.parse(localStorage.getItem('energy')).energy
      let formData = new FormData()
      formData.append('n', this.n)
      formData.append('chro_size', this.chro_size)
      formData.append('crossover_prob', this.crossover_prob)
      formData.append('mut_prob', this.mut_prob)
      formData.append('energy', this.energy)
      formData.append('stop', this.stop)
      formData.append('option_stop', this.option_stop)
      formData.append('option_trim', this.option_trim)
      formData.append('poda', this.poda)

      axios.post('http://127.0.0.1:8000/api/food/altered/', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
        .then(response => {
          this.result = response.data.result// delete bytes python format( b'')
          this.getSum()
        })
        .catch(e => {
          console.log('error' + e)
        })
    },
    getSum () {
      this.sum = 0
      for (let i = 0; i < this.result.length; i++) {
        this.sum = this.sum + this.result[i].kcal
      }
    }
  }
}
</script>
