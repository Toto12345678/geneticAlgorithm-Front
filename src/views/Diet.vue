<template lang='pug'>
  .columns.is-multiline.is-centered.is-mobile.p-l-md.p-r-md
    .column.is-12(v-if="!result")
      p.has-text-centered.p-t-sm.p-b-md.has-text-weight-bold.is-size-5 Datos personales
      form.columns.is-mobile.is-multiline(@submit.prevent='submit' @keydown.enter.prevent='submit')

        .field.column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Nombre
          .control
            input.input.is-small(type='text' placeholder='Nombre' v-model='name')

        .field.column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Edad
          .control
            input.input.is-small(type='text' placeholder='Edad' v-model='age')

        .column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Género
          .field
            p.control.is-expanded
              span.select.is-small.is-fullwidth
                select(v-model='sex')
                  option(value='mujer') Femenino
                  option(value='hombre') Masculino

        .field.column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Estatura en centímetros
          .control
            input.input.is-small(type='text' placeholder='0' v-model='height')

        .field.column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Peso en kg
          .control
            input.input.is-small(type='text' placeholder='0' v-model='weight')

        .column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Actividad
          .field
            p.control.is-expanded
              span.select.is-small.is-fullwidth
                select(v-model='activity')
                  option(value=.10) Reposo en cama
                  option(value=.20) Leve
                  option(value=.30) Media
                  option(value=.40) Fuerte

        .column.is-6-tablet.is-6-mobile.m-b-0
          label.label.is-size-6 Nivel de estres
          .field
            p.control.is-expanded
              span.select.is-small.is-fullwidth
                select(v-model='stress_factor')
                  option(value=1.25) No estres
                  option(value=1.35) Leve
                  option(value=1.45) Medio
                  option(value=1.55) Alto
                  option(value=1.7) Muy alto

        button.button.is-rounded.is-primary.is-fullwidth.m-t-sm Procesar
    .column.is-12(v-if='result')
      p.has-text-centered.has-text-weight-bold.m-t-xl Resultados del cálculo de PERKEIN 2015
      table.table.is-hoverable.is-striped.is-bordered.is-fullwidth
        thead
          tr.is-selected
            th Peso ideal
            th BMR
            th Energía
            th Proteinas
            th Grasas
            th Carbohidratos
        tbody
          tr
            th {{result.weight}} kg
            td {{result.bmr}}
            td {{result.energy}} kcal
            td {{result.protein}}
            td {{result.fat}}
            td {{result.carbs}}
      router-link.button.is-primary.is-outlined(:to="{ name: 'GeneticParameters' }") Obtener dieta
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Diet',
  data: () => ({
    name: '',
    age: 0,
    sex: '',
    height: 0.0,
    weight: 0.0,
    activity: 0.0,
    stress_factor: 0.0,
    age_factor: 0.0,
    result: 0.0
  }),
  methods: {
    submit () {
      if (this.age <= 40) { this.age_factor = 0 }
      if (this.age > 40 & this.age <= 59) { this.age_factor = 0.5 }
      if (this.age > 59 & this.age <= 69) { this.age_factor = 0.10 }
      if (this.age > 69) { this.age_factor = 0.15 }
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('age_factor', this.age_factor)
      formData.append('sex', this.sex)
      formData.append('height', this.height)
      formData.append('weight', this.weight)
      formData.append('activity', this.activity)
      formData.append('stress_factor', this.stress_factor)

      axios.post('http://127.0.0.1:8000/api/food/calculate', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
        .then(response => {
          this.result = response.data // delete bytes python format( b'')
          localStorage.clear()
          localStorage.setItem('energy', JSON.stringify(response.data))
        })
        .catch(e => {
          console.log('error' + e)
        })
    }
  }
}
</script>
