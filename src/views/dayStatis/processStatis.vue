<template>
<section>
    <v-container fluid grid-list-md >    
      <template  v-if="$vuetify.breakpoint.smAndUp">
        <v-card
        dark
        dense
        max-height=65
        class="mb-3"
        color="grey darken-3 dark"
        gradient="to left, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
        <v-row class="mx-3">
         <div class="ma-1"> 
          <date-picker  v-model='startDate' :input-props='{
            class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-5",
            placeholder: "Please enter startDate",
            readonly: true
          }'/>
         </div>
         <div class="ma-1">
          <date-picker  v-model='endDate' :input-props='{
            class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-5",
            placeholder: "Please enter endDate",
            readonly: true
          }'/>
         </div>
          <v-spacer></v-spacer>
          <v-btn 
            class ="mt-3 mx-1"
            color="grey darken-2"
            :value="true"
          >
            조회
            <v-icon  class="mx-1" >mdi-magnify</v-icon>
          </v-btn>
         <v-divider vertical></v-divider>
          <v-btn 
            class ="mt-3 mx-1"
            color="grey darken-2"
            :value="true"
            @click="this"
           >
            신규 등록
           <v-icon  class="mx-1" @click="this">mdi-expand-all-outline</v-icon>
           </v-btn>
        </v-row>
        </v-card>
        </template> 

        <template>
        <Calendar />
        </template>
    </v-container>
</section>
</template>

<script>
  export default {
    data: () => ({
      startDate: null, //datePicker
      endDate: new Date(), //datePicker
      today: '2019-01-08',
      events: [
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-30',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-31',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          date: '2019-01-07',
          open: false
        },
        {
          title: '30th Birthday',
          details: 'Celebrate responsibly',
          date: '2019-01-03',
          open: false
        },
        {
          title: 'New Year',
          details: 'Eat chocolate until you pass out',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Conference',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-01-21',
          open: false
        },
        {
          title: 'Hackathon',
          details: 'Code like there is no tommorrow',
          date: '2019-02-01',
          open: false
        }
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.title)
      }
    }
  }
</script>
