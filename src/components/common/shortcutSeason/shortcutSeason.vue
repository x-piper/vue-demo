<template>
  <div class="shortcut-season" v-clickoutside="handleClickoutside">
    <div class="el-date-editor el-input el-date-editor--daterange" @click="handleClick">
      <input autocomplete="off" placeholder="选择日期范围" type="text" rows="2" class="el-input__inner" v-model='season_label_bht' readonly>
    </div>
    <div class="el-picker-panel el-date-picker el-popper has-sidebar" x-placement="bottom-end" v-show='menu_visible'>
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <div class='el-picker-panel el-date-picker'>
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
                        <td class="available" :class="{'current':end_year == time_season_year}">
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
                      <el-radio-button label="3">Q1</el-radio-button>
                      <el-radio-button label="6">Q2</el-radio-button>
                      <el-radio-button label="9">Q3</el-radio-button>
                      <el-radio-button label="12">Q4</el-radio-button>
                    </el-radio-group>
                  </div>
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
<style lang="scss" type="text/css" src="./shortcutSeason.scss"></style>
<script src="./shortcutSeason.js"></script>