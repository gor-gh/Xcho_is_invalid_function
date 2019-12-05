<template>
  <table id="all_cont">
    <thead>
      <h1>
        <span class="header">Settings</span>
      </h1>
    </thead>
    <tbody>
      <tr class="settings_menu">
        <td>
          Dark Mode is
          <strong>
            <b>{{ boolean ? 'on' : 'off' }}</b>
          </strong>
        </td>
        <td>
          <div id="dark_mode">
            <md-switch v-model="boolean" class="md-primary"></md-switch>
          </div>
        </td>
      </tr>
      <tr class="settings_menu">
        <td>
          <span id="filter_text">Show Events:</span>
        </td>
        <td>
          <span id="filter">
            <md-checkbox v-model="showAccepted" checked>Accepted</md-checkbox>
            <md-checkbox v-model="showDeclined" checked>Declined</md-checkbox>
            <md-checkbox v-model="showWaiting" checked>Waiting</md-checkbox>
            <md-checkbox v-model="showPast" checked>Past</md-checkbox>
          </span>
        </td>
      </tr>
      <tr class="settings_menu">
        <td>Notify Me Before:</td>
        <td>
          <md-radio v-model="radio" value="15" name="quarter">15 min</md-radio>
          <md-radio v-model="radio" value="30" name="half">30 min</md-radio>
          <md-radio v-model="radio" value="60" name="hour">1 hour</md-radio>
        </td>
      </tr>
      <tr>
        <td>Download History as PDF</td>
        <td>
          <md-button href="../../public/img/apple.png" class="download_button" download>Download</md-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script>
export default {
  data() {
    return {
      radio: "30",
      boolean: false,
      showAccepted: true,
      showDeclined: true,
      showWaiting: true,
      showPast: true
    };
  },
  mounted() {
    if (localStorage.boolean) {
      this.boolean = localStorage.boolean == "true" ? true : false;
      if (this.boolean) {
        document.documentElement.style.setProperty(
          "--basic-text-color",
          "#C1B9BA"
        );
        document.documentElement.style.setProperty(
          "--basic-background-color",
          "#212121"
        );
        document.documentElement.style.setProperty(
          "--basic-check-col",
          "#212121"
        );
      } else {
        document.documentElement.style.setProperty(
          "--basic-text-color",
          "#212529"
        );
        document.documentElement.style.setProperty(
          "--basic-background-color",
          "#ffffff"
        );
        document.documentElement.style.setProperty(
          "--basic-check-col",
          "#C1B9BA"
        );
      }
    }
    if (localStorage.radio) {
      this.radio = localStorage.radio;
    }
    if (localStorage.showAccepted) {
      this.showAccepted = localStorage.showAccepted == "true" ? true : false;
    }
    if (localStorage.showWaiting) {
      this.showWaiting = localStorage.showWaiting == "true" ? true : false;
    }
    if (localStorage.showDeclined) {
      this.showDeclined = localStorage.showDeclined == "true" ? true : false;
    }
    if (localStorage.showPast) {
      this.showPast = localStorage.showPast == "true" ? true : false;
      console.log(this.showPast);
    }
  },
  watch: {
    radio(newRadioVal) {
      localStorage.radio = newRadioVal;
    },
    boolean(newBoolVal) {
      if (this.boolean) {
        document.documentElement.style.setProperty(
          "--basic-text-color",
          "#C1B9BA"
        );
        document.documentElement.style.setProperty(
          "--basic-background-color",
          "#212121"
        );
        document.documentElement.style.setProperty(
          "--basic-check-col",
          "#212121"
        );
      } else {
        document.documentElement.style.setProperty(
          "--basic-text-color",
          "#212529"
        );
        document.documentElement.style.setProperty(
          "--basic-background-color",
          "#ffffff"
        );
        document.documentElement.style.setProperty(
          "--basic-check-col",
          "#C1B9BA"
        );
      }
      localStorage.boolean = newBoolVal;
    },
    showAccepted(newAcceptedVal) {
      if (!this.showAccepted) {
        this.$emit("filterAccepted");
      } else {
        this.$emit("showAccepted");
      }
      localStorage.showAccepted = newAcceptedVal;
    },
    showPast() {
      if (!this.showPast) {
        console.log("arec");
        this.$emit("filterPast");
      } else {
        this.$emit("showPast");
      }
      localStorage.showPast = this.showPast;
    },
    showDeclined(newDeclinedVal) {
      if (!this.showDeclined) {
        this.$emit("filterDeclined");
      } else {
        this.$emit("showDeclined");
      }
      localStorage.showDeclined = newDeclinedVal;
    },
    showWaiting(newWaitingVal) {
      if (!this.showWaiting) {
        this.$emit("filterWaiting");
      } else {
        this.$emit("showWaiting");
      }
      localStorage.showWaiting = newWaitingVal;
    }
  }
};
</script>

<style >
:root {
  --basic-text-color: #212529;
  --basic-background-color: #ffffff;
  --basic-check-col: #c1b9ba;
}
body {
  background-color: var(--basic-background-color) !important;
  color: var(--basic-text-color) !important;
}
#all_cont {
  color: var(--basic-text-color);
  width: 97%;
  height: 100vh;
  margin: 0 auto;
  margin-top: 20px;
}
.md-switch-thumb {
  background-color: var(--basic-text-color) !important;
}
.md-switch-container {
  background-color: #c1b9ba !important;
}
.header {
  font-size: 40px !important;
}
#filters {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
#filter_text {
  width: 20%;
  line-height: 100%;
}
#filter {
  width: 80%;
}
.md-checkbox-container {
  background-color: var(--basic-text-color) !important;
  border: 1px solid var(--basic-text-color) !important;
}
.settings_menu > td:first-child {
  width: 20% !important  ;
}
.settings_menu {
  border-bottom-style: solid;
  border-width: 1px;
  border-color: var(--basic-text-color);
}
.md-radio-container {
  background-color: var(--basic-text-color);
}
.md-radio-container {
  border: 1px solid var(--basic-check-col) !important;
}
.md-radio-container:after {
  background-color: var(--basic-check-col) !important;
}
.download_button {
  background-color: var(--basic-text-color) !important;
  color: var(--basic-check-col) !important;
  width: 20% !important;
}
.md-button {
  width: 20% !important;
}
body {
  color: var(--basic-text-color) !important;
}
</style> 