<template>
  <el-container>
    <!-- <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div> -->
    <el-aside width="200px" class="x-aside">
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-openeds="['from']" :default-active="active_top_index" class="x-menu" :router="true">
        <el-submenu index="from">
          <template slot="title"><i class="el-icon-message"></i>Form</template>
          <el-menu-item index="input" :route="{name:'XInput'}">Input</el-menu-item>
          <el-menu-item index="select" :route="{name:'XSelect'}">Select</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script src="./home.js"></script>