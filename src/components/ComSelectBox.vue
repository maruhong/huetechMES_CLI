<template>
  <div class="browser-default custom-select mb-4">
    <select :value="value" @change="onChange($event.target.value)">
      <option v-for="item in items" v-bind:key="item.label">
        {{item.value}}{{unit}}
      </option>
    </select>
  </div>
</template>

<script>

  export default {
    data() {
      return {
      }
    },

    methods: {
      onChange: function(value) {
        if (value === '') {
          value = null;
        }
        this.$emit('input', value);
      }
    },

    props: ['items', 'value', 'unit']
  }
</script>