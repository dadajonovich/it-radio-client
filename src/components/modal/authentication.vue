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
    <div class="authentication">
      <div class="authentication__tabs tabs">
        <button
          v-for="item in tabsItems"
          :key="`tab-${item.name}`"
          class="tabs__item"
          :class="currentTabsItem === item.name && 'is-active'"
          @click.prevent="changeTab(item.name)"
        >
          {{ item.label }}
        </button>
      </div>
      <template v-if="currentTabsItem === 'login'">
        <FormKit
          v-model="formLogin"
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
          @click-outside="close"
        >
          <FormKitSchema :schema="loginForm" />
        </FormKit>
      </template>
      <template v-else>
        <FormKit
          v-model="formRegistration"
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
          <FormKitSchema :schema="registerForm" />
        </FormKit>
      </template>
    </div>
  </vue-final-modal>
</template>

<script>
import { app } from '@/services';

export default {
  name: 'authentication',
  data() {
    return {
      currentTabsItem: 'login',
      tabsItems: [
        {
          label: 'Войти',
          name: 'login',
        },
        {
          label: 'Зарегистрироваться',
          name: 'register',
        },
      ],
      formLogin: {},
      formRegistration: {},
      registerForm: [
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
          name: 'password',
          label: 'придумайте пароль',
          placeholder: 'Придумайте пароль',
          validation: 'required',
          outerClass: 'field--required',
        },
        {
          $formkit: 'password',
          name: 'repeatPassword',
          label: 'Повторите пароль',
          placeholder: 'Повторите пароль',
          validation: 'required',
          outerClass: 'field--required',
        },
      ],
      loginForm: [
        {
          $formkit: 'text',
          name: 'email',
          label: 'Почта',
          placeholder: 'Почта',
          validation: 'required',
          outerClass: 'field--required',
        },
        {
          $formkit: 'password',
          name: 'password',
          label: 'пароль',
          placeholder: 'Пароль',
          validation: 'required',
          outerClass: 'field--required',
        },
      ],
      showLoaderSending: false,
    };
  },
  computed: {
    show() {
      return this.$store.state.modal.auth;
    },
  },
  methods: {
    changeTab(tab) {
      this.currentTabsItem = tab;
    },
    submitHandler(data, node) {
      if (this.currentTabsItem === 'login') {
        app
          .loginUser(this.formLogin)
          .then((res) => {
            this.$store.dispatch('setToken', res);
            app
              .user()
              .then((user) => {
                this.$store.dispatch('setUser', user);
                this.close();
                this.next('profile');
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            node.setErrors([err.detail], err.error);
          });
      } else {
        if (this.formRegistration.password === this.formRegistration.repeatPassword) {
          app
            .createUser(this.formRegistration)
            .then((res) => {
              this.$store.dispatch('setToken', res);
              app
                .user()
                .then((user) => {
                  this.$store.dispatch('setUser', user);
                  this.close();
                  this.next('profile');
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              node.setErrors([err.detail], err.error);
              console.log(err);
            });
        } else {
          node.setErrors(['Пароли не совпадают'], {
            password: '',
            repeatPassword: '',
          });
        }
      }
    },
    close() {
      this.$store.dispatch('setModal', { auth: false });
    },
    next(name) {
      this.$router.push({ name });
    },
  },
};
</script>
