<template>
  <v-col cols="4" sm="6" md="4">
   <v-dialog
      ref="dialog"
      v-model="timeModal"
      :return-value.sync="time"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-time-picker
        v-if="timeModal"
        v-model="time"
        full-width
      >
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="timeModal = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="set()">OK</v-btn>
      </v-time-picker>
    </v-dialog>
  </v-col>
</template>

<script>

export default {
  name: "TimePicker",
  props: ['label'],
  data: () => ({
    time: "",
    timeModal: false,
  }),
  methods: {
    set() {
      this.$refs.dialog2.save(this.time);
    }
  }
}
</script>