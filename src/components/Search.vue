<template>
  <div class="search_panel_container">
    <div class="first_row-container">
      <div class="page_heading_container">
        <h1 class="page_heading">{{pageHeadingText}}</h1>
      </div>
      <md-field>
        <label>{{name}}</label>
        <md-input @keypress.enter="focusElement('select')" v-model="searchName"></md-input>
        <span class="md-helper-text">{{searchNameHelp}}</span>
      </md-field>
    </div>
    <div class="second_row_container">
      <div class="first_col_in_second_row">
        <md-field>
          <label for="codes">{{codeTranslation}}</label>
          <md-select ref="select" v-model="selectedPhoneCode" name="codes" id="codes">
            <md-option value="Code" disabled>Code</md-option>
            <md-option value="055">055</md-option>
            <md-option value="099">099</md-option>
            <md-option value="095">095</md-option>
            <md-option value="077">077</md-option>
            <md-option value="011">011</md-option>
            <md-option value="098">098</md-option>
            <md-option value="094">094</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="second_col_in_second_row">
        <md-field>
          <label>{{phone}}</label>
          <!-- <span class="md-prefix"> {{selectedPhoneCode}} </span> -->
          <md-input
            @keydown="cheInputValue(event)"
            type="number"
            v-model="searchPhone"
            maxlength="6"
            ref="num"
          ></md-input>
          <span class="md-helper-text">{{searchPhoneHelp}}</span>
        </md-field>
      </div>
      <br />
      <br />
    </div>
    <div class="third_row_container">
      <ul class="search_result_list">
        <li
          class="no_result_item"
          v-show="!searchResults.length && (!isPhoneFieldTouched || !isNameFieldTouched)"
        >{{noResText}}</li>
        <li class="results" v-show="searchResults.length">{{resText}}</li>
        <li v-for="(result,index) in searchResults" :key="index">{{result}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNameFieldTouched: true,
      isPhoneFieldTouched: true,
      codeTranslation: "Code",
      selectedPhoneCode: "",
      pageHeadingText: "Search Panel",
      noResText: "No Result",
      resText: "Results`",
      searchNameHelp: "Search by client's name",
      searchPhoneHelp: "Search by client's phone number",
      name: "Type name here",
      phone: "Type client's phone",
      searchName: "",
      searchSurname: "",
      searchPhone: "",
      searchResults: [],
      response: "",
      inputGoneBlure: false
    };
  },
  methods: {
    onInpBlure(state) {
      if (state && this.searchName == "") {
        this.inputGoneBlure = true;
        return;
      }
      this.inputGoneBlure = false;
    },
    cheInputValue(event) {
      if (
        this.searchPhone.toString().length >= 6 &&
        event.which != 8 &&
        event.which != 37 &&
        event.which != 38 &&
        event.which != 39 &&
        event.which != 40
      ) {
        event.preventDefault();
      }
    },
    focusElement(name) {
      if (name == "select") {
        this.$refs.select.$children[0].$children[0].$el.focus();
      } else if (name == "number") {
        setTimeout(() => {
          this.$refs.num.$el.focus();
        }, 1);
      }
    }
  },
  watch: {
    searchName() {
      // this.isNameFieldTouched = false;
    },
    searchPhone() {
      this.isPhoneFieldTouched = false;
      if (this.searchPhone == "") {
        this.isPhoneFieldTouched = true;
      }
    },
    selectedPhoneCode(newS) {
      // console.log(newS);
      this.focusElement("number");
    }
  }
};
</script>

<style>
.md-select-menu .md-checkbox-container {
  display: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.md-select {
  text-align: center;
}
.md-list-item-text {
  align-items: center !important;
}
#md-input-6hdrfriyn {
  text-align: center;
}
.md-menu-content.md-select-menu {
  width: auto !important;
}
.search_panel_container {
  width: 97%;
  color: var(--basic-text-color) !important;
}
.first_row-container {
  width: 60%;
  margin: 0 auto;
  padding-top: 30px;
}
.second_row_container {
  width: 60%;
  margin: 0 auto;
  padding-top: 30px;
  display: flex;
  justify-content: flex-start;
}
.first_col_in_second_row {
  width: 10%;
  height: auto;
  margin-right: 30px;
}
.second_col_in_second_row {
  width: 50%;
  height: auto;
}
.page_heading {
  font-size: 30px !important;
}
.search_result_list {
  list-style-type: none;
  /* background-color: red; */
  height: 400px;
}
.search_result_list > li:not(:first-child),
.search_result_list > li:not(:nth-child(2)) {
  margin-bottom: 10px;
  /* border-bottom-style: solid;
    border-width: 1px;
    border-color: black; */
}
.md-helper-text {
  font-size: 15px !important;
}
</style>