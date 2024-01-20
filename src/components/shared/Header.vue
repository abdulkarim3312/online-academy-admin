<template>
  <header class="header_area">
    <div class="header_inner">
      <ul class="header_left">
        <li>
          <div class="logo">
            <router-link :to="{ name: 'dashboard' }">
              <img :src="`${baseUrl}assets/images/logo.png`" alt="" />
            </router-link>
          </div>
        </li>
        <li
          :class="{
            active: [
              'members_admin',
              'member_admin_add',
              'member_admin_edit',
              'parent_list',
              'parent_add',
              'parent_edit',
              'student_list',
              'student_add',
              'student_edit',
            ].includes($route.name),
          }"
        >
          <router-link :to="{ name: 'parent_list' }">{{
            $t('header.memberManagement')
          }}</router-link>
        </li>
        <li
          :class="{
            active: [
              'course_overview_list', 'course_overview_add', 'course_overview_edit', 'course_requirement', 'course_requirement', 'course_curriculum', 'course_details'
            ].includes($route.name),
          }"
        >
          <router-link :to="{ name: 'course_details' }"
            >Course</router-link
          >
        </li>
        <li
          :class="{
            active: [
              'product_list',
              'product_add',
              'product_edit',
              'product_welcome',
              'product_outcome',
              'product_overview',
              'product_overview_content_list',
              'product_overview_content_add',
              'product_overview_content_edit',
              'product_overview_list',
              'product_overview_add',
              'product_overview_edit',
              'topic_one_content_one',
              'topic_one_content_two',
              'topic_one_content_three',
              'topic_one_content_four',
              'topic_one_content_five',
              'topic_two_content_six',
              'topic_three_content_one',
              'topic_three_content_two',
              'topic_four_content_one',
              'topic_four_content_two',
              'extend_learning'
            ].includes($route.name),
          }"
        >
          <router-link :to="{ name: 'product_add' }"
            >Product Management</router-link
          >
        </li>
        <li
          :class="{
            active: [
              'package_list',
              'package_add',
              'package_edit',
              'plan_list',
              'plan_add',
              'plan_edit',
            ].includes($route.name),
          }"
        >
          <router-link :to="{ name: 'package_list' }"
            >Package Management</router-link
          >
        </li>
        <li
          :class="{
            active: ['order_list', 'order_details'].includes($route.name),
          }"
        >
          <router-link :to="{ name: 'order_list' }"
            >Order Management</router-link
          >
        </li>
        <li
          :class="{
            active: ['home_banner_section', 'about_us', 'site_logo'].includes($route.name),
          }"
        >
          <router-link :to="{ name: 'home_banner_section' }"
            >Setting</router-link
          >
        </li>
      </ul>
      <ul>
        <li>
          <div class="logout">
            <a href="javascript:void(0)" @click.prevent="logout">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
    }),
  },
  mounted() {
    // $(document).on('click', '.dropdown button', function () {
    //     $(this).parent().children('.dropdown_menu').toggleClass('open');
    // });
    // $(document).mouseup(function (e) {
    //     $('.dropdown').each(function () {
    //         var dropdown = $(this);
    //         if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
    //             dropdown.find('.dropdown_menu').removeClass('open');
    //         }
    //     });
    // });
  },
  methods: {
    logout() {
      this.axios.post('/logout').finally(() => {
        this.$store.dispatch('auth/logout');
        this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>
<style scoped></style>
