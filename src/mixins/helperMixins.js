export default {
  data() {
    return {
      memberRoutes: ['members_admin', 'members_admin_add', 'members_admin_edit'],
      productsRoutes: ['products_single', 'products_single_add', 'products_single_edit'],
      settingsRoutes: ['settings_textbook', 'settings_textbook_add', 'settings_textbook_edit', 'settings_area',
        'settings_area_add', 'settings_area_edit', 'settings_subject', 'settings_subject_add', 'settings_subject_edit'],
    }
  },
  methods: {
    showSuccessMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'success',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    },
    showFailMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'error',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    },
    getAllQueryParams() {
        const params = new URLSearchParams(window.location.search);

        return Array.from(params.keys()).reduce(
            (acc, val) => ({ ...acc, [val]: params.get(val) }),
            {}
        );
    },
  }
}