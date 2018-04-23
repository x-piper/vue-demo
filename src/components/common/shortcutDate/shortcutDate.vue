<template>
  <div class="shortcut-date">
    <div class="el-date-editor el-input el-date-editor--daterange" @click="handleClick">
      <input autocomplete="off" placeholder="选择日期范围" type="text" rows="2" class="el-input__inner" v-model='time_label_bht' readonly>
    </div>
    <div class="el-picker-panel el-date-picker el-popper has-sidebar" x-placement="bottom-end" v-show='menu_visible'>
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__sidebar">
          <button type="button" class="el-picker-panel__shortcut" :class="{active:show_type=='month'}" @click="activeShortcuts('month')">月</button>
          <button type="button" class="el-picker-panel__shortcut" :class="{active:show_type=='season'}" @click="activeShortcuts('season')">季度</button>
          <button type="button" class="el-picker-panel__shortcut" :class="{active:show_type=='half_year'}" @click="activeShortcuts('half_year')">半年</button>
          <button type="button" class="el-picker-panel__shortcut" :class="{active:show_type=='year'}" @click="activeShortcuts('year')">年</button>
        </div>
        <div class="el-picker-panel__body">
          <div v-if="show_type=='month' && menu_visible" class='el-picker-panel el-date-picker' :activeType="active_type">
            <div class='time-wrap'>
              <div class='cell-wrap middle-wrap'>
                <month-panel @pick="setMonth"></month-panel>
                <!-- <el-date-picker v-model="time_month" type="date" placeholder="选择月" :clearable="false" value-format="yyyy-MM" @change="pickMonth" :picker-options="month_picker">
                </el-date-picker> -->
              </div>
            </div>
          </div>
          <div v-if="show_type=='season' && menu_visible" class='el-picker-panel el-date-picker' :activeType="active_type">
            <div class='time-wrap'>
              <div class='cell-wrap'>
                <div class="year-wrap">
                  <div>选择年</div>
                  <table @click="pickSeason" class="el-year-table">
                    <tbody>
                      <tr>
                        <td class="available" :class="{'current':end_year-11 == time_season_year}">
                          <a class="cell">{{ end_year - 11 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-10 == time_season_year}">
                          <a class="cell">{{ end_year - 10 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-9 == time_season_year}">
                          <a class="cell">{{ end_year - 9 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-8 == time_season_year}">
                          <a class="cell">{{ end_year - 8 }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="available" :class="{'current':end_year-7 == time_season_year}">
                          <a class="cell">{{ end_year - 7 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-6 == time_season_year}">
                          <a class="cell">{{ end_year - 6 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-5 == time_season_year}">
                          <a class="cell">{{ end_year - 5 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-4 == time_season_year}">
                          <a class="cell">{{ end_year - 4 }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="available" :class="{'current':end_year-3 == time_season_year}">
                          <a class="cell">{{ end_year - 3 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-2 == time_season_year}">
                          <a class="cell">{{ end_year - 2 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-1 == time_season_year}">
                          <a class="cell">{{ end_year - 1 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year == time_season_year,'disabled':disabled_end_season_year}">
                          <a class="cell">{{ end_year }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="month-wrap">
                  <div>选择季度</div>
                  <div class="month-radio-wrap">
                    <el-radio-group v-model="time_season_season" size="mini">
                      <el-radio-button label="3">1月-3月</el-radio-button>
                      <el-radio-button label="6" :disabled="disabled_2_season_year">4月-6月</el-radio-button>
                      <el-radio-button label="9" :disabled="disabled_3_season_year">7月-9月</el-radio-button>
                      <el-radio-button label="12" :disabled="disabled_4_season_year">10月-12月</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="show_type=='half_year' && menu_visible" class='el-picker-panel el-date-picker' :activeType="active_type">
            <div class='time-wrap'>
              <div class='cell-wrap'>
                <div class="year-wrap">
                  <div>选择年</div>
                  <table @click="pickHalfYear" class="el-year-table">
                    <tbody>
                      <tr>
                        <td class="available" :class="{'current':end_year-11 == time_half_year_year}">
                          <a class="cell">{{ end_year - 11 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-10 == time_half_year_year}">
                          <a class="cell">{{ end_year - 10 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-9 == time_half_year_year}">
                          <a class="cell">{{ end_year - 9 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-8 == time_half_year_year}">
                          <a class="cell">{{ end_year - 8 }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="available" :class="{'current':end_year-7 == time_half_year_year}">
                          <a class="cell">{{ end_year - 7 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-6 == time_half_year_year}">
                          <a class="cell">{{ end_year - 6 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-5 == time_half_year_year}">
                          <a class="cell">{{ end_year - 5 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-4 == time_half_year_year}">
                          <a class="cell">{{ end_year - 4 }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="available" :class="{'current':end_year-3 == time_half_year_year}">
                          <a class="cell">{{ end_year - 3 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-2 == time_half_year_year}">
                          <a class="cell">{{ end_year - 2 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-1 == time_half_year_year}">
                          <a class="cell">{{ end_year - 1 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year == time_half_year_year,'disabled':disabled_end_half_year}">
                          <a class="cell">{{ end_year }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="month-wrap">
                  <div>选择半年</div>
                  <div class="month-radio-wrap">
                    <el-radio-group v-model="time_half_year_half" size="mini" @change="pickHalfYearHalf">
                      <el-radio-button label="6">1月-6月</el-radio-button>
                      <el-radio-button label="12" :disabled="half_year_half_disabled">7月-12月</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="show_type=='year' && menu_visible" class='el-picker-panel el-date-picker' :activeType="active_type">
            <div class='time-wrap'>
              <div class='cell-wrap'>
                <div class="year-wrap">
                  <div>选择年</div>
                  <table @click="pickYear" class="el-year-table">
                    <tbody>
                      <tr>
                        <td class="available" :class="{'current':end_year-11 == time_year_year}">
                          <a class="cell">{{ end_year - 11 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-10 == time_year_year}">
                          <a class="cell">{{ end_year - 10 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-9 == time_year_year}">
                          <a class="cell">{{ end_year - 9 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-8 == time_year_year}">
                          <a class="cell">{{ end_year - 8 }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="available" :class="{'current':end_year-7 == time_year_year}">
                          <a class="cell">{{ end_year - 7 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-6 == time_year_year}">
                          <a class="cell">{{ end_year - 6 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-5 == time_year_year}">
                          <a class="cell">{{ end_year - 5 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-4 == time_year_year}">
                          <a class="cell">{{ end_year - 4 }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="available" :class="{'current':end_year-3 == time_year_year}">
                          <a class="cell">{{ end_year - 3 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-2 == time_year_year}">
                          <a class="cell">{{ end_year - 2 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year-1 == time_year_year}">
                          <a class="cell">{{ end_year - 1 }}</a>
                        </td>
                        <td class="available" :class="{'current':end_year == time_year_year,'disabled':true}">
                          <a class="cell">{{ end_year }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div style="position: absolute;bottom:2px;text-align:right;width:276px;">
            <span class="error">
              {{error}}
            </span>
            <el-button type="text" @click="cancleTime">关闭</el-button>
            <el-button type="text" @click="confirmTime">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" type="text/css" src="./shortcutDate.scss"></style>
<script src="./shortcutDate.js"></script>