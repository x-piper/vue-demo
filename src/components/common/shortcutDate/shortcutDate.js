import Clickoutside from 'UI/src/utils/clickoutside'
import { MonthBefore, prefixDate } from 'assets/js/common';
import { hasClass } from 'UI/src/utils/dom';
import MonthPanel from 'UI/packages/date-picker/src/panel/month';
export default {
  name: 'shortcutDate',
  data() {
    return {
      error: "",
      end_year: "", //最后可选的年
      end_month: "", //最后可选的月
      type: 'month',
      show_type: 'month',
      time_value_bht: "",
      time_label_bht: "",
      time_type_bht: "",
      tmp_time_value_bht: "",
      tmp_time_label_bht: "",
      tmp_time_type_bht: "",
      menu_visible: false,
      time_month: "",
      month_picker: {
        disabledDate(time) {}
      }, //月份选择器特有的选项
      time_season_year: "",
      time_season_season: "",
      disabled_end_season_year: false, //季度选择器最后一年是否可选
      disabled_2_season_year: false, //季度选择器第二季度是否可选
      disabled_3_season_year: false, //季度选择器第二季度是否可选
      disabled_4_season_year: false, //季度选择器第二季度是否可选
      time_half_year_year: "", //半年选择器的年选项
      time_half_year_half: "", //半年选择器的半年选项
      disabled_end_half_year: false, //半年选择器最后一年是否可选
      half_year_half_disabled: false, //半年选择器下半年是否可选
      time_year_year: "",
      active_type: "",
      time_year: "",
    }
  },
  created() {
    // 默认时间为当前时间上一个月
    let date = new Date();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    this.end_year = new Date(MonthBefore(year, month, 1)).getFullYear();
    this.end_month = new Date(MonthBefore(year, month, 1)).getMonth() + 1;
  },
  mounted() {
    setTimeout(() => {
      if (window.localStorage.getItem("time_value_bht")) {
        this.time_value_bht = window.localStorage.getItem("time_value_bht");
        this.time_type_bht = window.localStorage.getItem("time_type_bht");
        this.time_label_bht = window.localStorage.getItem("time_label_bht");
        this.tmp_time_value_bht = this.time_value_bht;
        this.tmp_time_type_bht = this.time_type_bht;
        this.tmp_time_label_bht = this.time_label_bht;
        this.$store.commit("time_value_bht", this.time_value_bht);
        this.$store.commit("time_type_bht", this.time_type_bht);
        this.$store.commit("time_label_bht", this.time_label_bht);
        if (this.time_type_bht == "month") {
          this.time_month = this.time_value_bht;
        }
      } else {
        console.log("no time_value_bht");
      }
      this.month_picker = {
        disabledDate: (time) => {
          let today = new Date();
          return time.getTime() < new Date('2015-01-01 00:00:00').getTime() || time.getTime() >= new Date(today.getFullYear(), today.getMonth(), 1).getTime();
        }
      };
    }, 0)
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        this.menu_visible = false;
      } else {
        this.menu_visible = !this.menu_visible;
      }
      if (this.menu_visible) {
        this.show_type = this.type;
      }
    },
    activeShortcuts(val) {
      this.show_type = val;
      this.tmp_time_type_bht = val;
    },
    setMonth(val) {
      console.log(val);
    },
    pickMonth(value) {
      let year = new Date(value).getFullYear();
      let month = new Date(value).getMonth() + 1;
      this.tmp_time_value_bht = value;
      this.tmp_time_type_bht = 'month';
      this.tmp_time_label_bht = "月：" + MonthBefore(year, month, 12) + ' - ' + year + '-' + String(prefixDate(month));
      this.tmp_time_label_bht = "月：" + year + '-' + String(prefixDate(month));
    },
    /**
     * 半年选择器 - 选择年
     * @param   event 点击事件对象
     */
    pickSeason(event) {
      const target = event.target;
      if (target.tagName === 'A') {
        if (hasClass(target.parentNode, 'disabled')) return;
        const year = target.textContent || target.innerText;
        this.time_season_year = year;
      }
      if (this.time_half_year_year == this.end_year && this.end_month < 12) {
        this.half_year_half_disabled = true;
      } else {
        this.half_year_half_disabled = false;
      }
    },
    /**
     * 半年选择器 - 选择年
     * @param   event 点击事件对象
     */
    pickHalfYear(event) {
      const target = event.target;
      if (target.tagName === 'A') {
        if (hasClass(target.parentNode, 'disabled')) return;
        const year = target.textContent || target.innerText;
        this.time_half_year_year = year;
      }
      if (this.time_half_year_year == this.end_year && this.end_month < 12) {
        this.half_year_half_disabled = true;
      } else {
        this.half_year_half_disabled = false;
      }
    },
    /**
     * 半年选择器 - 选择半年
     * @param  {[type]} val 选中的 Radio label 值
     * @return {[type]}     [description]
     */
    pickHalfYearHalf(val) {
      if (this.end_month < val) {
        this.disabled_end_half_year = true;
      } else {
        this.disabled_end_half_year = false;
      }
    },
    /**
     * 年选择器 - 选择年
     * @param   event 点击事件对象
     */
    pickYear(event) {
      const target = event.target;
      if (target.tagName === 'A') {
        if (hasClass(target.parentNode, 'disabled')) return;
        const year = target.textContent || target.innerText;
        this.time_year_year = year;
      }
    },
    // getYearClass(year) {
    //   const class_obj = {};
    //   class_obj.disabled = typeof this.disabledDate === 'function' ?
    //     datesInYear(year).every(this.disabledDate) :
    //     false;
    //   style.current = this.value.getFullYear() === year;
    //   style.today = today.getFullYear() === year;
    //   style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

    //   return style;
    // },
    confirmTime() {
      let type = this.tmp_time_type_bht;
      if (type == "month") {
        if (!this.tmp_time_value_bht) {
          this.error = "请选择月";
        }
      }
      if (type == "season") {
        if (!this.time_season_year) {
          this.error = "请选择年";
        } else if (!this.time_season_season) {
          this.error = "请选择季度";
        } else {
          let year = this.time_season_year;
          let month = Number(this.time_season_season);
          this.tmp_time_value_bht = this.time_season_year + "&" + this.time_season_season;
          this.tmp_time_type_bht = 'season';
          this.tmp_time_label_bht = "季度：" + year + '-' + String(prefixDate(month - 2)) + ' - ' + year + '-' + String(prefixDate(month));
        }
      }
      if (type == "half_year") {
        if (!this.time_half_year_year) {
          this.error = "请选择年";
        } else if (!this.time_half_year_half) {
          this.error = "请选择半年";
        } else {
          let year = this.time_half_year_year;
          let month = Number(this.time_half_year_half);
          this.tmp_time_value_bht = this.time_half_year_year + "&" + this.time_half_year_half;
          this.tmp_time_type_bht = 'half_year';
          this.tmp_time_label_bht = "半年：" + year + '-' + String(prefixDate(month - 5)) + ' - ' + year + '-' + String(prefixDate(month));
        }
      }
      if (type == "year") {
        if (!this.time_year_year) {
          this.error = "请选择年";
        } else {
          let year = this.time_year_year;
          let month = 12;
          this.tmp_time_value_bht = this.time_year_year + "&" + 12;
          this.tmp_time_type_bht = 'year';
          this.tmp_time_label_bht = "年：" + year;
        }
      }
      if (this.error) {
        let timer = setTimeout(() => {
          this.error = "";
        }, 2000);
        return;
      }
      this.time_value_bht = this.tmp_time_value_bht || this.time_value_bht;
      this.time_label_bht = this.tmp_time_label_bht || this.time_label_bht;
      this.time_type_bht = this.tmp_time_type_bht || this.time_type_bht;
      this.$store.commit("time_value_bht", this.time_value_bht);
      this.$store.commit("time_label_bht", this.time_label_bht);
      this.$store.commit("time_type_bht", this.time_type_bht);
      this.menu_visible = false;
    },
    cancleTime() {
      this.menu_visible = false;
    },
  },
  watch: {
    menu_visible(value) {
      if (value) {
        this.time_month = "";
        this.time_season_year = "";
        this.time_season_season = "";
        this.time_half_year_year = "";
        this.time_half_year_half = "";
        this.time_year_year = "";
        this.show_type = this.$store.state.time_type_bht;
        if (this.end_month < 6) {
          this.disabled_end_half_year = true;
        }
        switch (this.show_type) {
          case "month":
            this.time_month = this.$store.state.time_value_bht;
            break;
          case "season":
            this.time_season_year = this.$store.state.time_value_bht.substring(0, 4);
            this.time_season_season = this.$store.state.time_value_bht.substring(5);
            break;
          case "half_year":
            this.time_half_year_year = this.$store.state.time_value_bht.substring(0, 4);
            this.time_half_year_half = this.$store.state.time_value_bht.substring(5);
            if (this.time_half_year_year == this.end_year && this.end_month < 12) {
              this.half_year_half_disabled = true;
            } else {
              this.half_year_half_disabled = false;
            }
            if (this.end_month >= 6 && this.end_month < 12 && this.time_half_year_half == 12) {
              this.disabled_end_half_year = true;
            }
            break;
          case "year":
            this.time_year_year = this.$store.state.time_value_bht.substring(0, 4);
            break;
        }
      }
    }
  },
  components: { MonthPanel },
  directives: { Clickoutside },
  props: {
    disabledDate: {},
  },
}