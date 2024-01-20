<template>
  <div class="row">
    <div :class="['col_12', {'loading_overlay': loading}]">
      <div class="card no_border">
        <div class="card-header">
          <div class="card-title">{{ pageName }}</div>
        </div>
        <div class="card-body pl_0 pr_0">
          <div class="row">
            <div class="col_3" v-if="form.parent_id">
                <div class="form-group ">
                    <label>{{ $t('sidebar.parentMember.parent_id') }}</label>
                    <input type="text" class="form_global"  v-model="form.parent_id" readonly>
                    <v-errors :errors="errorFor('parent_id')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('common.name') }}</label>
                    <input type="text" class="form_global"  v-model="form.name">
                    <v-errors :errors="errorFor('name')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('common.password') }}</label>
                    <input type="text" class="form_global"  v-model="form.password">
                    <v-errors :errors="errorFor('password')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('common.phone') }}</label>
                    <input type="text" class="form_global"  v-model="form.phone">
                    <v-errors :errors="errorFor('phone')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('common.email') }}</label>
                    <input type="text" class="form_global" v-model="form.email" :disabled="form.register_by === 'facebook' || form.register_by === 'google'" :readonly="form.register_by === 'facebook' || form.register_by === 'google'">
                    <v-errors :errors="errorFor('email')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('common.address') }}</label>
                    <input type="text" class="form_global"  v-model="form.address">
                    <v-errors :errors="errorFor('address')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('sidebar.parentMember.detail_address') }}</label>
                    <input type="text" class="form_global"  v-model="form.detailed_address">
                    <v-errors :errors="errorFor('detail_address')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group ">
                    <label>{{ $t('sidebar.parentMember.postal_code') }}</label>
                    <input type="text" class="form_global"  v-model="form.postal_code">
                    <v-errors :errors="errorFor('postal_code')"></v-errors>
                </div>
            </div>
            <div class="col_3">
                <div class="form-group">
                    <label>{{ $t('common.situation') }}</label>
                    <select class="form_global" id="situation" v-model="form.situation">
                        <option value="">{{ $t('common.select') }}</option>
                        <option value="approval">{{ $t('common.approval') }}</option>
                        <option value="stop">{{ $t('common.stop') }}</option>
                        <option value="dormancy">{{ $t('common.dormancy') }}</option>
                        <option value="secession">{{ $t('common.secession') }}</option>
                    </select>
                    <v-errors :errors="errorFor('situation')"></v-errors>
                </div>
            </div>

            <div class="col_12">
                <div class="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="photo"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('photo')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhoto || form.photo">
                  <div class="inner">
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" width="150">
                    <img v-else :src="form.photo" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
            </div>

            <div class="col_3 mt_10" v-if="$route.name === 'parent_edit'">
                <div class="form-group ">
                    <label>{{ $t('sidebar.parentMember.login_info') }}</label>
                    <p>{{ $t('sidebar.parentMember.visitor_number') }}: {{ form.login_count }} | {{ $t('sidebar.parentMember.last_visited') }}: {{ form.last_login }} | {{ $t('sidebar.parentMember.join_date') }}: {{ form.registered_at }}</p>
                </div>
            </div>
            <div class="col_12">
                <div class="form-group ">
                    <label>{{ $t('common.memo') }}</label>
                    <text-editor-component 
                      :id="'memo'" 
                      :existingData="form.memo ? form.memo : ''" 
                      @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('memo')"></v-errors>
                </div>
            </div>
          </div>
          <div class="d_flex_end form_action_btn">
            <router-link class="btn btn_danger ml_10" :to="{name: cancelRouteName}">{{ $t('common.cancel') }}</router-link>
            <button class="btn btn_blue ml_10" @click.prevent="submitForm">{{ $t('common.save') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextEditorComponent from "@/components/TextEditorComponent";
export default {
  name: 'parent-form',
  components: {
    TextEditorComponent
  },
  data() {
    return {
      pageName: this.$t('sidebar.parentMember.addParent'),
      cancelRouteName: 'parent_list',
      form: {
        parent_id: '',
        name: '',
        password: '',
        phone: '',
        email: '',
        address: '',
        detailed_address: '',
        postal_code: '',
        situation: '',
        memo: '',
        content: '',
        login_count: 0,
        last_login: '',
        registered_at: '',
        photo: ''
      },
      tempPhoto: '',
    }
  },
  created() {
    if (this.$route.name === 'parent_edit') {
      this.axios.get('/parents/'+this.$route.params.id)
        .then((response) => {
          this.form = response.data.data;
            // let parentData = response.data.data
            // this.form.parent_id = parentData.parent_id;
            // this.form.name = parentData.name;
            // this.form.password = parentData.password;
            // this.form.phone = parentData.phone;
            // this.form.photo = parentData.photo;
            // this.form.email = parentData.email;
            // this.form.address = parentData.address;
            // this.form.detailed_address = parentData.detailed_address;
            // this.form.postal_code = parentData.postal_code;
            // this.form.situation = parentData.situation;
            // this.form.memo = parentData.memo;
            // this.form.login_count = parentData.login_count;
            // this.form.last_login = parentData.last_login;
            // this.form.registered_at = parentData.registered_at;
            // this.form.register_by = parentData.register_by;
        })
      this.pageName = this.$t('sidebar.parentMember.editParent');
    }
  },
  methods: {
    changeEditorValue(editorId, data){
      this.form[editorId] = data
    },
    onFileChangeOne(e) {
      this.form.photo = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
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

      if (this.$route.name === 'parent_edit') {
        formData.append('_method','PATCH')
        this.axios.post('/parents/'+this.$route.params.id, formData, {
            headers: {
                  'Content-Type': 'multipart/form-data',
                },
          })
          .then(() => {
            this.$router.push({name: 'parent_list'});
            this.showSuccessMsg(this.$t('common.updateSuccess'))
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/parents', formData,{
          headers: {
                  'Content-Type': 'multipart/form-data',
                },
          })
          .then(() => {
            this.$router.push({name: 'parent_list'});
            this.showSuccessMsg(this.$t('common.addSuccess'))
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
}
</script>
