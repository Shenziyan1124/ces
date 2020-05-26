<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: PingFang SC, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6e6e6e;
  height: 100%;
  font-size: 14px;
}

html,
body {
  margin: 0;
  height: 100%;
  padding: 0;
}

* {
  font-family: PingFang SC;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
