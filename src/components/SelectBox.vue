<template>
<div class="browser-default custom-select mb-4">
    <select
          v-model="this.value"
          v-bind:id="inputId"
          v-on:input="updateValue($event.target.value)">
        <option v-for="(item, index) in items" v-bind:key="item.value" :value="index">{{ item }}</option>
    </select>
</div>
</template>

<script>
    export default {
        name: "SelectBox",

        data() {
            return {
                //
            };
        },

        props: ['value', 'items', 'input_id'],

        methods: {
            updateValue: function (value) {
                this.$emit('input', value);
            }
        }

    }
</script>