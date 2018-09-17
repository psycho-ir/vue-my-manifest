<template>
  <div>
     <b-form-group  label="Volume path:">
        <b-form-input type="string"
                      v-model="currentVolume.mount_path"
                      required
                      placeholder="Volume path">
        </b-form-input>
      </b-form-group>
         <b-form-group  label="Storage sub path">
        <b-form-input type="string"
                      v-model="currentVolume.sub_path"
                      required
                      placeholder="Storage sub path">
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-button @click=" spec.volume_mounts.push(currentVolume); currentVolume={}">Add</b-button>
      </b-form-group>
    <b-table striped hover :fields="fields" :items="spec.volume_mounts">
      <template slot="show_details" slot-scope="row">
          <b-button size="sm" variant="danger" @click="spec.volume_mounts = spec.volume_mounts.filter(i => i != row.item)">remove</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'VolumeMountForm',
  props: ['spec'],
  data () {
    return {
      currentVolume: {}
    }
  },
  components: {
  }
}
</script>
