<template>
  <div>
    Readiness
    <div>
      <b-container>
        <b-form-group label="Readiness GET endpoint path:">
          <b-form-input type="string"
                        v-model="spec.readiness_probe.http_get.path"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Readiness GET endpoint port:">
          <b-form-input type="number"
                        v-model.number="spec.readiness_probe.http_get.port"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Initial delay before probing the container in seconds">
          <b-form-input type="number"
                        v-model.number="spec.readiness_probe.initial_delay_seconds"
                        required
                        >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Period between probing the container in seconds">
          <b-form-input type="number"
                        v-model.number="spec.readiness_probe.period_seconds"
                        required
                        >
          </b-form-input>
        </b-form-group>
      </b-container>
    </div>
    Liveness
    <div>
      <b-container>
        <b-form-group label="Liveness GET endpoint path:">
          <b-form-input type="string"
                        v-model="spec.liveness_probe.http_get.path"
                        required
                        placeholder="Readiness Get endpoint path">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Liveness GET endpoint port:">
          <b-form-input type="number"
                        v-model.number="spec.liveness_probe.http_get.port"
                        required
                        placeholder="Liveness Get endpoint port">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Initial delay before probing the container in seconds">
          <b-form-input type="number"
                        v-model.number="spec.liveness_probe.initial_delay_seconds"
                        required
                        placeholder="Liveness initial delay in seconds">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Period between probing the container in seconds">
          <b-form-input type="number"
                        v-model.number="spec.liveness_probe.period_seconds"
                        required
                        placeholder="Liveness period in seconds">
          </b-form-input>
        </b-form-group>
      </b-container>
    </div>
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
