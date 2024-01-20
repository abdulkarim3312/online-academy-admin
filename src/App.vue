<template>
  <div>
      <template v-if="!['login','question_print'].includes($route.name)">
          <div id="wrapper" v-if="loaded" :class="[{dashboard_page:$route.name === 'dashboard'}]">
              <header-component></header-component>
              <navbar-component></navbar-component>
              <div id="content_wrap">
                <div class="content_wrap_inner">
                    <div class="container">
                        <router-view></router-view>
                    </div>
                </div>
              </div>
          </div>
      </template>
      <template v-else>
          <router-view></router-view>
      </template>
  </div>
  
</template>

<script>
import HeaderComponent from "./components/shared/Header";
import NavbarComponent from "./components/shared/NavBar";

export default {
  components:{HeaderComponent, NavbarComponent},
  name: 'App',
  data() {
    return {
      loaded: false
    }
  },
  async created() {
    await this.axios('/user')
      .then(() => this.loaded = true)
      .catch(() => {
        this.$store.dispatch('auth/logout');
        this.$router.push({name: 'login'});
      })
  },
}
</script>
