<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <b-field>
          <button 
            class="button"
            @click="getPreviousDate(date)">
            <b-icon icon="chevron-left"></b-icon>
          </button>
          <b-datepicker 
            v-model="date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <button class="button is-primary"
                @click="setDateToCurrentDate">
                <b-icon icon="calendar-today"></b-icon>
                <span>Today</span>
            </button>
          </b-datepicker>
          <button 
            class="button"
            @click="getNextDate(date)">
            <b-icon icon="chevron-right"></b-icon>
          </button>
        </b-field>
      </div>
      <div class="column">
        <button
          class="button is-success wide"
          @click="saveData">Save</button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <header class="card-header orange-header">
            <p class="card-header-title">INFORMATION TO NOTE</p>
            <a
              class="button is-primary is-inverted is-outlined m-t-5 m-r-10"
              @click="addNote">
              <span class="icon is-small">
                <b-icon icon="plus"></b-icon>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <section>
                <b-table
                  :data="notes.length === 0? [] : notes"
                  :striped="isStriped"
                  :narrowed="isNarrowed"
                  :hoverable="isHoverable"
                  :loading="isLoading">
                  <template slot-scope="props">
                      <b-table-column 
                        label="Description">
                        <b-input v-model="props.row.description"></b-input>
                      </b-table-column>

                      <b-table-column 
                        label="Input by" 
                        width="100">
                          <b-input v-model="props.row.inputBy"></b-input>
                      </b-table-column>

                      <b-table-column 
                        label="Action by" 
                        width="100">
                          <b-input v-model="props.row.actionBy"></b-input>
                      </b-table-column>

                      <b-table-column 
                        label="" 
                        width="30">
                        <a
                          class="button is-danger is-outlined"
                          @click="deleteNote(props.row.id)">
                          <span class="icon is-small">
                            <b-icon icon="delete"></b-icon>
                          </span>
                        </a>
                      </b-table-column>
                      
                  </template>

                  <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                          <p>Nothing Yet!</p>
                        </div>
                    </section>
                  </template>
                </b-table>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
      <header class="card-header green-header">
        <p class="card-header-title">EVENTS TO SET UP/SERVICE</p>
        <a
          class="button is-primary is-inverted is-outlined m-t-5 m-r-10"
          @click="addEvent">
          <span class="icon is-small">
            <b-icon icon="plus"></b-icon>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <section>
            <b-table
              :data="events.length === 0?[]:events"
              :striped="isStriped"
              :narrowed="isNarrowed"
              :hoverable="isHoverable"
              :loading="isLoading">

              <template slot-scope="props">
                  <b-table-column 
                    label="Description">
                    <b-input v-model="props.row.description"></b-input>
                  </b-table-column>

                  <b-table-column 
                    label="Action by" 
                    width="100">
                      <b-input v-model="props.row.actionBy"></b-input>
                  </b-table-column>
                  <b-table-column 
                    label="Action" 
                    width="100">
                      <b-input v-model="props.row.actionBy"></b-input>
                  </b-table-column>
                  <b-table-column 
                    label="" 
                    width="30">
                    <a
                      class="button is-danger is-outlined"
                      @click="deleteEvent(props.row.id)">
                      <span class="icon is-small">
                        <b-icon icon="delete"></b-icon>
                      </span>
                    </a>
                  </b-table-column>
              </template>
              <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                      <p>Nothing Yet!</p>
                    </div>
                </section>
              </template>
            </b-table>
          </section>
        </div>
      </div>
    </div>
      </div>

    </div>
    <div class="card">
      <header class="card-header blue-header">
        <p class="card-header-title">TASKS TO DO</p>
        <a
          class="button is-primary is-inverted is-outlined m-t-5 m-r-10"
          @click="addTask">
          <span class="icon is-small">
            <b-icon icon="plus"></b-icon>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <section>
            <b-table
              :data="tasks.length === 0?[]:tasks"
              :striped="isStriped"
              :narrowed="isNarrowed"
              :hoverable="isHoverable"
              :loading="isLoading">

              <template slot-scope="props">
                  <b-table-column 
                    label="P!" 
                    width="40"
                    v-bind:class="{important: props.row.important}"
                    @click.native="props.row.important = !props.row.important">
                  </b-table-column>

                  <b-table-column 
                    label="Description"
                    v-bind:class="{completed: props.row.completed}">
                    <b-input v-model="props.row.description"></b-input>
                  </b-table-column>

                  <b-table-column 
                    label="Input by" 
                    width="100"
                    v-bind:class="{completed: props.row.completed}">
                      <b-input v-model="props.row.inputBy"></b-input>
                  </b-table-column>

                  <b-table-column 
                    label="Status" 
                    centered
                    v-bind:class="{completed: props.row.completed}">
                      <b-input v-model="props.row.status"></b-input>
                  </b-table-column>

                 <b-table-column 
                    label="Action by" 
                    width="100"
                    v-bind:class="{completed: props.row.completed}">
                      <b-input v-model="props.row.actionBy"></b-input>
                  </b-table-column>

                  <b-table-column 
                    label=""
                    width="30"
                    v-bind:class="{completed: props.row.completed}">
                      <b-checkbox 
                        v-model="props.row.completed"
                        class="m-t-8">
                      </b-checkbox>
                  </b-table-column>

                  <b-table-column 
                    label="" 
                    width="30">
                    <a
                      class="button is-danger is-outlined"
                      @click="deleteTask(props.row.id)">
                      <span class="icon is-small">
                        <b-icon icon="delete"></b-icon>
                      </span>
                    </a>
                  </b-table-column>
              </template>

              <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                      <p>Nothing Yet!</p>
                    </div>
                </section>
              </template>
            </b-table>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyCrC9epiGwZY96krCVaBMpZDsnlYvZxnYE',
  authDomain: 'daily-bm.firebaseapp.com',
  databaseURL: 'https://daily-bm.firebaseio.com',
  projectId: 'daily-bm',
  storageBucket: 'daily-bm.appspot.com',
  messagingSenderId: '444506267784'
})
// functions to create objects for each table
function Note (id) {
  this.id = id
  this.description = ''
  this.inputBy = ''
  this.actionBy = ''
}

function Event (id) {
  this.id = id
  this.description = ''
  this.actionBy = ''
}

function Task (id) {
  this.id = id
  this.important = false
  this.description = ''
  this.inputBy = ''
  this.status = ''
  this.actionBy = ''
  this.completed = false
}

export default {
  name: 'app',
  data () {
    let notes = []
    let events = []
    let tasks = []
    let isLoading = true
    let noteId = -1
    let eventId = -1
    let taskId = -1
    let date = new Date()
    date.setHours(0, 0, 0, 0)

    return {
      notes,
      events,
      tasks,
      date: date,
      isStriped: false,
      isNarrowed: true,
      isHoverable: false,
      isLoading: isLoading,
      noteId,
      eventId,
      taskId
    }
  },
  mounted () { this.getData() },
  methods: {
    addNote () {
      this.notes.push(new Note(++this.noteId))
    },
    deleteNote (id) {
      this.notes = this.notes.filter(note => note.id !== id)
    },

    addEvent () {
      this.events.push(new Event(++this.eventId))
    },
    deleteEvent (id) {
      this.events = this.events.filter(event => event.id !== id)
    },

    addTask () {
      this.tasks.push(new Task(++this.taskId))
    },
    deleteTask (id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    setDateToCurrentDate () {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      this.date = today
    },
    getData () {
      firebase.database().ref(this.date.toString()).once('value')
      .then(response => {
        this.notes = response.val().notes || []
        this.events = response.val().events || []
        this.tasks = response.val().tasks || []

        this.noteId = (this.notes.length === 0) ? 0 : this.notes[this.notes.length - 1].id
        this.eventId = (this.events.length === 0) ? 0 : this.events[this.events.length - 1].id
        this.taskId = (this.tasks.length === 0) ? 0 : this.tasks[this.tasks.length - 1].id

        this.isLoading = false
      })
      .catch(error => {
        // if date does not exist initialize to zero
        this.noteId = 0
        this.eventId = 0
        this.taskId = 0

        this.isLoading = false

        console.log(error)
      })
    },
    getNextDate (currentDate) {
      let nextDate = new Date()
      nextDate.setDate(currentDate.getDate() + 1)
      nextDate.setHours(0, 0, 0, 0)
      this.date = nextDate
    },
    getPreviousDate (currentDate) {
      let previousDate = new Date()
      previousDate.setDate(currentDate.getDate() - 1)
      previousDate.setHours(0, 0, 0, 0)
      this.date = previousDate
    },
    saveData () {
      this.isLoading = true
      firebase.database().ref(this.date.toString()).set({
        notes: this.notes,
        events: this.events,
        tasks: this.tasks
      })
      .then(response => {
        console.log('write successful')
        this.isLoading = false
        this.$toast.open({
          message: 'Data saved!',
          type: 'is-success'
        })
      })
      .catch(error => {
        console.log(error)
        window.alert('error occured')
        this.isLoading = false
      })
    }
  },
  watch: {
    date () {
      this.isLoading = true
      firebase.database().ref(this.date.toString()).once('value')
      .then(response => {
        this.notes = response.val().notes || []
        this.events = response.val().events || []
        this.tasks = response.val().tasks || []

        this.noteId = this.notes.length
        this.eventId = this.events.length
        this.taskId = this.tasks.length

        this.isLoading = false
      })
      .catch(error => {
        // if date does not exist initialize empty lists
        this.notes = []
        this.events = []
        this.tasks = []

        this.noteId = 0
        this.eventId = 0
        this.taskId = 0

        this.isLoading = false

        console.log(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 10px;
}
.blue-header{
  background-color:#1e88e5;
}
.orange-header{
  background-color:#f57c00;
}
.green-header{
  background-color:#43a047;
}
.card-header-title{
  color:white;
}
.important{
  background-color: red;
}
.completed{
  background-color: green;
}
.wide{
  padding-left:3em;
  padding-right:3em;
}
.m-t-5{
  margin-top: 5px;
}
.m-r-10{
  margin-right:10px;
}
.m-t-8{
  margin-top:8px;
}
</style>