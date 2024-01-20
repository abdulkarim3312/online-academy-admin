<template>
  <div>
    <section class="parent_dashboard_new_area ct_margin dasboard_c_t_padding">
      <div class="container custom_container parent_dasboard_new_container">
        <div class="row">
          <div class="col_3">
            <div class="welcome_parent_left">
              <div class="heading">
                <div class="heading_inner">
                  <div class="img">
                    <img
                      :src="`${baseUrl}assets/media/images/author.png`"
                      alt=""
                    />
                  </div>
                  <div class="text" v-if="user">
                    <h2>{{ user.name }}</h2>
                    <p>{{ user.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail7.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>Today visitor</p>
                  <h2>{{ todaysUniqueVisitors }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="up">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path> -->
                  </svg>
                </span>
                <!-- <p>9.5% new session</p> -->
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail8.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>This week visitors</p>
                  <h2>{{ thisWeekVisitors }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="down">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path> -->
                  </svg>
                </span>
                <!-- <p>7.5% vs. previous month</p> -->
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail9.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>This month visitor</p>
                  <h2>{{ thisMonthVisitors }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="up">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path> -->
                  </svg>
                </span>
                <!-- <p>3.5% bounce rate</p> -->
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail7.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>New user</p>
                  <h2>{{ newVisitors }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="up">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path> -->
                  </svg>
                </span>
                <!-- <p>9.5% new session</p> -->
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail8.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>Live user</p>
                  <h2>{{ liveVisitors }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="down">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path> -->
                  </svg>
                </span>
                <!-- <p>7.5% vs. previous month</p> -->
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail9.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>Today sales</p>
                  <h2>{{ totalSales }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="up">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path> -->
                  </svg>
                </span>
                <!-- <p>3.5% bounce rate</p> -->
              </div>
            </div>
          </div>
          <div class="col_3">
            <div class="google_analytics_statistics">
              <div class="head">
                <div class="img">
                  <img
                    :src="`${baseUrl}assets/media/images/dashboard/img-thumnail9.png`"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p>This month sales</p>
                  <h2>{{ totalMonthlySales }}</h2>
                </div>
              </div>
              <div class="content">
                <span class="up">
                  <svg viewBox="0 0 24 24">
                    <!-- <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path> -->
                  </svg>
                </span>
                <!-- <p>3.5% bounce rate</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Chart from 'chart.js/auto';
export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
      todaysUniqueVisitors: 0,
      thisWeekVisitors: 0,
      thisMonthVisitors: 0,
      newVisitors: 0,
      liveVisitors: 0,
      totalSales: 0,
      totalMonthlySales: 0,
      salesData: {
        today: {
          sessions: 0,
          newUser: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          goalCompleted: 0,
          goalCvr: 0,
        },
        this_week: {
          sessions: 0,
          newUser: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          goalCompleted: 0,
          goalCvr: 0,
        },
        this_month: {
          sessions: 0,
          newUser: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          goalCompleted: 0,
          goalCvr: 0,
        },
        this_year: {
          sessions: 0,
          newUser: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          goalCompleted: 0,
          goalCvr: 0,
        },
      },
      // revenuePieChart: null,
      // revenuePieChartOptions: {
      //     plugins: {
      //         legend: {
      //             display: false,
      //         }
      //     },
      //     elements: {
      //         line: {
      //             fill: false,
      //             tension: .15
      //         }
      //     },
      //     responsive: true,
      //     maintainAspectRatio: false
      // },
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
    }),
  },
  created() {
    // this.axios.get('/total-sales').then((response) => {
    //   this.totalSales = response.data.data;
    // });
    // this.axios.get('/total-monthly-sales').then((response) => {
    //   this.totalMonthlySales = response.data.data;
    // });
  },
  mounted() {
    // this.revenuePieChart = new Chart(document.getElementById('revenuePieChart'), {
    //     type: 'line',
    //     data: {
    //         datasets: [{
    //             borderWidth: 1,
    //             borderColor: '#263989',
    //             backgroundColor: [
    //                     'rgb(75, 192, 192)',
    //                     'rgb(54, 162, 235)',
    //                     'rgb(38, 57, 137)',
    //                 ],
    //             pointBackgroundColor: '#263989',
    //             pointRadius: 4,
    //             barThickness: 50,
    //             pointHoverBackgroundColor: '#263989'
    //         }]
    //     },
    //     options: this.revenuePieChartOptions
    // });
    // this.getrevenuePieChartData()
  },
  methods: {
    getrevenuePieChartData() {
      this.axios.get('/analytics-revenue-data').then((response) => {
        this.revenuePieChart.data.labels = response.data.labels;
        this.revenuePieChart.data.datasets[0].data = response.data.data;
        this.revenuePieChart.data.backgroundColor =
          response.data.backgroundColor;
        this.revenuePieChart.update();
      });
    },
  },
};
</script>
<style scoped>
.analytics_table table tr td:last-child {
  text-align: center;
}
.parent_dashboard_new_area .parent_dashboard_new_chart {
  height: 100% !important;
}
</style>
