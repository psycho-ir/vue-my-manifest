<template>
  <tab-content title="Volume Configuration">
    <label>Volume path</label>
    <div class="wrapper">
      <input class="form-control"
             type="text"
             v-model="currentVolume.volume_path"/>
    </div>
    <label>Storage sub path</label>
    <div class="wrapper">
      <input class="form-control"
             type="text"
             v-model="currentVolume.sub_path"/>
    </div>
    <input type="button" @click=" spec.volume_mounts.push(currentVolume); currentVolume={}" value="add"/>
    <div v-for="vm in spec.volume_mounts" v-bind:key="vm.volume_path">
      {{vm}} <span @click="spec.volume_mounts = spec.volume_mounts.filter(i => i != vm)">x</span>
    </div>
  </tab-content>
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
