<template>
  <div>
    <b-form-group label="Readiness Get endpoint path:">
      <b-form-input type="string"
                    v-model="spec.readiness_probe.http_get.path"
                    required
                    placeholder="Readiness Get endpoint path">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Readiness Get endpoint port:">
      <b-form-input type="number"
                    v-model.number="spec.readiness_probe.http_get.port"
                    required
                    placeholder="Readiness Get endpoint port">
      </b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'HealthCheckForm',
  props: ['spec'],
  data () {
    return {}
  },
  components: {}
}
</script>
