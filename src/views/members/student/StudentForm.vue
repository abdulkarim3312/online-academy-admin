<template>
  <div class="row">
    <div :class="['col_12', { loading_overlay: loading }]">
      <div class="card no_border">
        <div class="card-header">
          <div class="card-title">{{ pageName }}</div>
        </div>
        <div class="card-body pl_0 pr_0">
          <div class="row">
            <div class="col_3" v-if="editId">
              <div class="form-group">
                <label>{{ $t('sidebar.studentMember.student_id') }}</label>
                <input
                  type="text"
                  class="form_global"
                  v-model="form.student_id"
                  readonly
                />
                <v-errors :errors="errorFor('student_id')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('sidebar.parentMember.parent_id') }}</label>
                <select
                  class="form_global"
                  id="situation"
                  v-model="form.user_id"
                  :disabled="editId"
                >
                  <option value="">{{ $t('common.select') }}</option>
                  <option
                    :value="parent.id"
                    v-for="parent in parents"
                    :key="'parent_' + parent.id"
                  >
                    {{ parent.parent_id }}
                  </option>
                </select>
                <v-errors :errors="errorFor('user_id')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('common.name') }}</label>
                <input type="text" class="form_global" v-model="form.name" />
                <v-errors :errors="errorFor('name')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('common.password') }}</label>
                <input
                  type="text"
                  class="form_global"
                  v-model="form.password"
                />
                <v-errors :errors="errorFor('password')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('common.phone') }}</label>
                <input type="text" class="form_global" v-model="form.phone" />
                <v-errors :errors="errorFor('phone')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('common.email') }}</label>
                <input type="email" class="form_global" v-model="form.email" />
                <v-errors :errors="errorFor('email')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('common.situation') }}</label>
                <select
                  class="form_global"
                  id="situation"
                  v-model="form.situation"
                >
                  <option value="">{{ $t('common.select') }}</option>
                  <option value="approval">{{ $t('common.approval') }}</option>
                  <option value="stop">{{ $t('common.stop') }}</option>
                  <option value="dormancy">{{ $t('common.dormancy') }}</option>
                  <option value="secession">
                    {{ $t('common.secession') }}
                  </option>
                </select>
                <v-errors :errors="errorFor('situation')"></v-errors>
              </div>
            </div>
            <div class="col_3">
              <div class="form-group">
                <label>{{ $t('common.photo') }}</label>
                <input
                  type="file"
                  class="form_global"
                  ref="photo"
                  @input="onFileChange($event)"
                  accept="image/png, image/gif, image/jpeg, image/webp"
                />
                <v-errors :errors="errorFor('photo')"></v-errors>
              </div>
              <div class="thumbnail_img" v-if="tempPhoto || form.photo">
                <div class="inner">
                  <img v-if="tempPhoto" :src="tempPhoto" alt="" />
                  <img v-else :src="form.photo" alt="" />
                  <span class="close_icon" @click="removeTempPhoto"></span>
                </div>
              </div>
            </div>

            <div class="col_3 mt_10" v-if="$route.name === 'student_edit'">
              <div class="form-group">
                <label>{{ $t('sidebar.parentMember.login_info') }}</label>
                <p>
                  {{ $t('sidebar.parentMember.visitor_number') }}:
                  {{ form.login_count }} |
                  {{ $t('sidebar.parentMember.last_visited') }}:
                  {{ form.last_login }} |
                  {{ $t('sidebar.parentMember.join_date') }}:
                  {{ form.registered_at }}
                </p>
              </div>
            </div>

            <div class="col_12">
              <div class="form-group">
                <label>{{ $t('common.memo') }}</label>
                <text-editor-component
                  :id="'memo'"
                  :descriptive="''"
                  :existingData="form.memo ? form.memo : ''"
                  @change="changeEditorValue"
                />
                <v-errors :errors="errorFor('memo')"></v-errors>
              </div>
            </div>
          </div>
          <div class="d_flex_end form_action_btn">
            <router-link
              class="btn btn_danger ml_10"
              :to="{ name: cancelRouteName }"
              >{{ $t('common.cancel') }}</router-link
            >
            <button class="btn btn_blue ml_10" @click.prevent="submitForm">
              {{ $t('common.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextEditorComponent from '@/components/TextEditorComponent';
export default {
  name: 'student-form',
  components: {
    TextEditorComponent,
  },
  data() {
    return {
      pageName: this.$t('sidebar.studentMember.addStudent'),
      cancelRouteName: 'student_list',
      editId: this.$route.params.id,
      form: {
        student_id: '',
        user_id: '',
        name: '',
        password: '',
        phone: '',
        email: '',
        situation: '',
        memo: '',
        photo: '',
        login_count: 0,
        last_login: '',
        registered_at: '',
      },
      parents: [],
      tempPhoto: '',
    };
  },
  created() {
    this.axios
      .get('/parents')
      .then((response) => (this.parents = response.data.data));

    if (this.$route.name === 'student_edit') {
      this.axios.get('/students/' + this.$route.params.id).then((response) => {
        let studentData = response.data.data;
        this.form.student_id = studentData.student_id;
        this.form.user_id = studentData.user_id;
        this.form.name = studentData.name;
        this.form.password = studentData.password;
        this.form.phone = studentData.phone;
        this.form.email = studentData.email;
        this.form.situation = studentData.situation;
        this.form.memo = studentData.memo;
        this.form.photo = studentData.photo;
        this.form.login_count = studentData.login_count;
        this.form.last_login = studentData.last_login;
        this.form.registered_at = studentData.registered_at;
      });
      this.pageName = this.$t('sidebar.studentMember.editStudent');
    }
  },
  methods: {
    changeEditorValue(editorId, data) {
      this.form[editorId] = data;
    },
    onFileChange(e) {
      this.form.photo = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhoto() {
      this.tempPhoto = '';
      this.form.photo = '';
      this.$refs.photo.value = null;
    },
    submitForm() {
      this.allErrors = null;
      this.loading = true;

      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      if (this.$route.name === 'student_edit') {
        formData.append('_method', 'PATCH');

        this.axios
          .post('/students/' + this.$route.params.id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            this.$router.push({ name: 'student_list' });
            this.showSuccessMsg(this.$t('common.updateSuccess'));
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios
          .post('/students/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            this.$router.push({ name: 'student_list' });
            this.showSuccessMsg(this.$t('common.addSuccess'));
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
