<template>
  <vue-final-modal
    v-model="show"
    class="modal__container"
    content-class="modal__block"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    :clickToClose="false"
    @click-outside="close()"
  >
    <button class="button modal__close" @click="close"></button>
    <div class="modal__content">
      <div class="modal__title">Изменение данных</div>
      <FormKit
        v-model="formData"
        type="form"
        data-loading="showLoaderSending"
        form-class="$reset registration__form form"
        submit-label="Войти"
        :disabled="showLoaderSending"
        :loading="showLoaderSending ? true : undefined"
        :submit-attrs="{
          inputClass: '$reset button m--white m--w-100',
          wrapperClass: '$reset registration__form-submit form__submit',
          outerClass: '$reset',
        }"
        @submit="submitHandler"
      >
        <FormKitSchema :schema="userForm" />
      </FormKit>
    </div>
  </vue-final-modal>
</template>

<script>
import { app } from '@/services';

export default {
  name: 'recovery',
  data() {
    return {
      userForm: [
        {
          $formkit: 'text',
          name: 'email',
          label: 'Ваша почта',
          placeholder: 'Ваша почта',
          validation: 'required',
          outerClass: 'field--required',
        },
        {
          $formkit: 'password',
          name: 'old_password',
          label: 'Введите старый пароль',
          placeholder: 'Введите старый пароль',
          validation: 'required',
          outerClass: 'field--required',
        },
        {
          $formkit: 'password',
          name: 'password',
          label: 'Введите новый пароль',
          placeholder: 'Введите новый пароль',
          validation: 'required',
          outerClass: 'field--required',
        },
      ],
      formData: {},
      showLoaderSending: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    show() {
      return this.$store.state.modal.changingUser;
    },
  },
  mounted() {
    this.formData.email = this.user?.email;
  },
  methods: {
    submitHandler(data, node) {
      this.showLoaderSending = true;
      app
        .updateUser(this.formData)
        .then((user) => {
          this.showLoaderSending = false;
          this.$store.dispatch('setUser', user);
        })
        .catch((err) => {
          this.showLoaderSending = false;
          node.setErrors([err.detail], err.error);
        });
    },
    close() {
      this.$store.dispatch('setModal', { changingUser: false });
    },
    next(name) {
      this.$router.push({ name });
    },
  },
};
</script>
