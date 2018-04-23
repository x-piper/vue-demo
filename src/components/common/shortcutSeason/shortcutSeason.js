import Clickoutside from 'UI/src/utils/clickoutside'
import { MonthBefore, prefixDate } from 'assets/js/common';
export default {
  name: 'shortcutDate',
  data() {
    return {
      error: "",
      end_year: new Date().getFullYear(),
      time_value_bht: "",
      season_label_bht: "",
      time_type_bht: "",
      menu_visible: false,
      time_season_year: "",
      time_season_season: "",
    }
  },
  components: {},
  directives: { Clickoutside },
  props: {},
  mounted() {
    // setTimeout(() => {
    //   if (window.localStorage.getItem("season_value_bht")) {
    //     this.season_value_bht = window.localStorage.getItem("season_value_bht");
    //     this.season_label_bht = window.localStorage.getItem("season_label_bht");
    //   } else {
    //     let month = new Date().getMonth() + 1;
    //     let year = new Date().getFullYear();
    //     if (month < 4) {
    //       this.season_value_bht = (year - 1) + "&" + 12;
    //       this.season_label_bht = (year - 1) + "Q4";
    //     } else if (month >= 4 && month < 7) {
    //       this.season_value_bht = year + "&" + 3;
    //       this.season_label_bht = year + "Q1";
    //     } else if (month >= 7 && month < 10) {
    //       this.season_value_bht = year + "&" + 6;
    //       this.season_label_bht = year + "Q2";
    //     } else if (month >= 10) {
    //       this.season_value_bht = year + "&" + 9;
    //       this.season_label_bht = year + "Q3";
    //     }
    //     window.localStorage.setItem("season_value_bht", this.season_value_bht);
    //     window.localStorage.setItem("season_label_bht", this.season_label_bht);
    //   }
    //   // this.$emit("seasonChange", { type: "season", value: this.season_value_bht, label: this.season_label_bht });
    // }, 10)
  },
  watch: {
    menu_visible(value) {
      if (value) {
        this.time_season_year = "";
        this.time_season_season = "";
        this.time_season_year = this.season_value_bht.substring(0, 4);
        this.time_season_season = this.season_value_bht.substring(5);
      }
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        this.menu_visible = false;
      } else {
        this.menu_visible = !this.menu_visible;
      }
    },
    pickSeason(event) {
      const target = event.target;
      if (target.tagName === 'A') {
        const year = target.textContent || target.innerText;
        this.time_season_year = year;
      }
    },
    setTime(value, label) {
      this.season_value_bht = value;
      this.season_label_bht = label;
    },
    confirmTime() {
      if (!this.time_season_year) {
        this.error = "请选择年";
      } else if (!this.time_season_season) {
        this.error = "请选择季度";
      } else {
        let year = this.time_season_year;
        let month = Number(this.time_season_season);
        this.season_value_bht = year + "&" + month;
        this.season_label_bht = year + "Q" + (month / 3);
        window.localStorage.setItem("season_value_bht", this.season_value_bht);
        window.localStorage.setItem("season_label_bht", this.season_label_bht);
        this.$emit("seasonChange", { type: "season", value: this.season_value_bht, label: this.season_label_bht });
      }
      if (this.error) {
        let timer = setTimeout(() => {
          this.error = "";
        }, 2000);
        return;
      }
      this.menu_visible = false;
    },
    cancleTime() {
      this.menu_visible = false;
    },
    handleClickoutside() {
      this.menu_visible = false;
    },
  }
}