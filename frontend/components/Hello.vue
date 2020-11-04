<template>
  <div>
    <div class="hello-world-content large-content">Hello {{ world }}</div>

    <v-card height="300" elevation="12" class="ver-gap">
      <v-card-title>Acculator</v-card-title>
      <div class="ver-gap count-content">
        <transition name="slide-fade" mode="out-in">
          <v-chip :key="count" color="secnodary">{{ count }}</v-chip>
        </transition>
      </div>
      <v-card-actions>
        <v-row>
          <v-col cols="6" sm="2">
            <v-btn color="primary" @click="count++">+1</v-btn>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn color="primary" @click="count--">-1</v-btn>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn color="primary" @click="count = 0">0</v-btn>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn color="primary" @click="count *= 2">×2</v-btn>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn color="primary" @click="count /= 2">÷2</v-btn>
          </v-col>
          <v-col cols="6" sm="2">
            <v-btn color="primary" @click="count = -count">±</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-btn @click="sendNotify">Send A Test Push Notify To Everyone</v-btn>
    <v-alert dismissible dense text v-model="alertShow" :type="alertType">
      {{ alerMsg }}
    </v-alert>

    <div class="ver-gap">
      <img :alt="imgSrc" :src="imgSrc" />
    </div>
  </div>
</template>

<script>
import img from "../img/view.jpeg";

export default {
  data() {
    return {
      imgSrc: img,
      world: "Vue and Webpack",
      count: 0,
      alertType: "success",
      alerMsg: "hhii",
      alertShow: false
    };
  },
  methods: {
    sendNotify() {
      axios
        .get("/notify")
        .then(data => {
          this.alertType = "success";
          this.alerMsg = "send Notify Success, " + data.data.toString();
          this.alertShow = true;
        })
        .catch(err => {
          this.alertType = "error";
          this.alerMsg = "send Notify error, Please check your network";
          this.alertShow = true;
        });
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

.ver-gap {
  transform: translateY();
  margin-top: 5px;
}

.hello-world-content {
  padding: 10px;
  font-size: 24px;
  background-color: #4056f4;
  color: white;
  text-align: center;
}

.count-content {
  padding: 5px;
  font-size: 24px;
  background-color: #aaaaaa;
  border-radius: 8px;
  text-align: center;
}
</style>
