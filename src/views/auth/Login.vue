<template>
  <div class="login_wrapper" v-if="!user">
    <div class="logo">
        <router-link :to="{name: 'login'}">
            <img :src="`${baseUrl}assets/images/logo.png`" alt="">
            <!-- <span>|</span>
            <span>간호대학</span> -->
        </router-link>
    </div>
    <div class="login_container">
        <div class="col-right">
            <div class="login-form">
                <h2>{{ $t('login.adminTitle') }}</h2>
                <form>
                  <p>
                    <input type="text" :placeholder="$t('login.adminIdPlaceholder')" v-model="form.admin_id">
                    <v-errors :errors="errorFor('admin_id')"></v-errors>
                  </p>
                  <p>
                    <input type="password" :placeholder="$t('login.passwordPlaceholder')" v-model="form.password">
                    <v-errors :errors="errorFor('password')"></v-errors>
                  </p>
                  <p>
                    <input type="submit" @click.prevent="login" :value="$t('common.login')" />
                  </p>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import validationErrors from "../../mixins/validationErrors";
import {mapGetters} from "vuex";

export default {
  mixins: [validationErrors],
  computed: {
      ...mapGetters({
          user: 'auth/getUser',
      }),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
      form: {
        admin_id: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      this.allErrors = null;

      this.$store.dispatch('auth/login', this.form)
          .then(() => window.location.href = process.env.VUE_APP_BASE)
          .catch((err) => this.allErrors = err.errors)
          .finally(() => this.loading = false);
    }
  }
}
</script>