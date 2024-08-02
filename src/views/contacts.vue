<template>
  <div class="app__content contacts">
    <AppBreadcrumbs
      :breadcrumbs="[
        { name: 'Главная', route: { name: 'home' } },
        { name: 'Контакты', route: { name: 'contacts' } },
      ]"
    />
    <h1 class="h2">Контакты</h1>
    <div class="contacts__content">
      <div v-if="contacts" class="contacts__info">
        <div v-for="(item, index) in contactsField" :key="index">
          <div v-if="item.title !== dictionaryFields.socials" class="text contacts__item">
            <span class="title">{{ item.title }}</span>
            {{ item.data }}
          </div>
          <div v-else class="contacts__socials">
            <span class="title">{{ item.title }}</span>
            <div v-for="(href, social) in item.data" :key="social" class="contacts__social">
              <a :href="href" :class="['contacts__social', social]"></a>
            </div>
          </div>
        </div>
      </div>
      <div class="contacts__map">
        <div class="contacts__map-frame" style="position: relative; overflow: hidden">
          <a
            href="https://yandex.ru/maps/56/chelyabinsk/?utm_medium=mapframe&utm_source=maps"
            style="color: #eee; font-size: 12px; position: absolute; top: 0px"
            >Челябинск</a
          ><iframe
            src="https://yandex.ru/map-widget/v1/?ll=61.421984%2C55.159071&mode=poi&poi%5Bpoint%5D=61.399655%2C55.160475&poi%5Buri%5D=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE1OTUyNxIg0KDQvtGB0YHQuNGPLCDQp9C10LvRj9Cx0LjQvdGB0LoiCg04nHVCFb2jXEI%2C&z=14.04"
            width="100%"
            height="100%"
            frameborder="1"
            allowfullscreen="true"
            style="position: relative"
          ></iframe>
        </div>
      </div>
      <FormKit
        v-model="formData"
        type="form"
        data-loading="showLoaderSending"
        form-class="$reset contacts__form form"
        submit-label="Отправить"
        :disabled="showLoaderSending"
        :loading="showLoaderSending ? true : undefined"
        :submit-attrs="{
          inputClass: '$reset button m--white m--arrow m--w-100',
          wrapperClass: '$reset registration__form-submit form__submit',
          outerClass: '$reset',
        }"
        @submit="submitHandler"
        @click-outside="$emit('hideModal')"
      >
        <div class="title">Напишите нам</div>
        <FormKitSchema :schema="schema" />
      </FormKit>
    </div>
    <SupportBlock />
  </div>
</template>

<script>
import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';
import SupportBlock from '@/components/support-block.vue';
import { app } from '@/services';

export default {
  name: 'contacts',
  components: { SupportBlock, AppBreadcrumbs },
  data() {
    return {
      formData: {},
      schema: [
        {
          $formkit: 'text',
          name: 'name',
          label: 'ФИО',
          placeholder: 'ФИО',
          validation: 'required',
          outerClass: 'field--required',
        },
        {
          $formkit: 'text',
          name: 'name',
          label: 'Название организации',
          placeholder: 'Название организации',
          validation: 'required',
          outerClass: 'field--required',
        },
        {
          $formkit: 'text',
          name: 'email',
          label: 'Электронная почта',
          placeholder: 'example@example.com',
          validation: 'required|email',
          outerClass: 'field--required',
        },
        {
          $formkit: 'textarea',
          name: 'message',
          label: 'Сообщение',
          placeholder: 'Сообщение',
          validation: 'required',
          outerClass: 'field--required',
        },
      ],
      showLoaderSending: false,
      contacts: null,
      dictionaryFields: {
        phone: 'Телефон',
        address: 'Адрес',
        email: 'Почта',
        socials: 'Соц. сети',
      },
    };
  },
  computed: {
    contactsField() {
      const address = this.formatAddress(this.contacts);
      const phone = this.contacts.phone;
      const email = this.contacts.email;
      const socials = {
        ['m--telegram']: this.contacts.telegram_url,
        ['m--vk']: this.contacts.vk_url,
      };

      const fields = {
        address,
        phone,
        email,
        socials,
      };

      const fieldsWithoutNull = this.removeNullFields(fields);
      return this.createArrayContacts(this.dictionaryFields, fieldsWithoutNull);
    },
  },
  created() {
    app.getSupportInfo().then((responce) => {
      this.contacts = { ...responce };
    });
  },
  mounted() {},
  methods: {
    submitHandler() {},
    removeNullFields(obj) {
      const result = {};
      for (const key in obj) {
        if (obj[key] !== null) {
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            result[key] = this.removeNullFields(obj[key]);
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    },
    createArrayContacts(dictionary, fields) {
      const result = [];
      for (const key in fields) {
        if (dictionary[key]) {
          result.push({ title: dictionary[key], data: fields[key] });
        }
      }
      return result;
    },
    formatAddress(contacts) {
      if (contacts.city && contacts.street && contacts.house) {
        return `г. ${contacts.city}, ул. ${contacts.street}, д. ${contacts.house}`;
      }
      return null;
    },
  },
};
</script>
